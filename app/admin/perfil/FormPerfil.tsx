// /app/(panel)/perfil/FormPerfil.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

import { perfilSchema, type PerfilSchema, type PerfilFormValues } from '@/types/perfil';
import { createPerfil, updatePerfil } from '@/services/perfilService';

interface Props {
  initialData?: Partial<PerfilSchema> & { id?: number };
  onSuccess: () => void;
}

const isLocalUrl = (u?: string | null) =>
  !!u && (u.startsWith('blob:') || u.startsWith('data:'));

// ===== Helpers para nombre del PDF con elipsis =====
const NAME_MAX = 28;

const fileNameFromUrl = (url?: string | null): string | null => {
  if (!url) return null;
  try {
    const pathname = new URL(url).pathname;
    const last = pathname.split('/').pop() ?? '';
    return decodeURIComponent(last || 'cv.pdf');
  } catch {
    const last = url.split('/').pop() ?? '';
    return decodeURIComponent(last || 'cv.pdf');
  }
};

/** Elipsis en medio: ej. "guia_tablero_…_final.pdf" */
const ellipsizeMiddle = (name?: string | null, max = NAME_MAX): string | null => {
  if (!name) return null;
  if (name.length <= max) return name;
  const extMatch = name.match(/(\.[a-z0-9]{1,6})$/i);
  const ext = extMatch ? extMatch[1] : '';
  const base = ext ? name.slice(0, -ext.length) : name;
  const keep = Math.max(3, max - (ext.length + 1)); // 1 por “…” intermedio
  const head = Math.ceil(keep * 0.6);
  const tail = keep - head;
  return `${base.slice(0, head)}…${base.slice(-tail)}${ext}`;
};

export default function FormPerfil({ initialData, onSuccess }: Props) {
  // refs de inputs file
  const fotoHeroRef = useRef<HTMLInputElement>(null);
  const fotoSobreMiRef = useRef<HTMLInputElement>(null);
  const cvRef = useRef<HTMLInputElement>(null);

  // previews imágenes
  const [previewHero, setPreviewHero] = useState<string | null>(initialData?.fotoHeroUrl ?? null);
  const [previewSobreMi, setPreviewSobreMi] = useState<string | null>(initialData?.fotoSobreMiUrl ?? null);

  // estado CV
  const [cvExistingUrl, setCvExistingUrl] = useState<string | null>(initialData?.cvUrl ?? null);
  const [cvName, setCvName] = useState<string | null>(null); // nombre del nuevo seleccionado
  const [cvFile, setCvFile] = useState<File | null>(null);

  // archivos seleccionados
  const [fotoHeroFile, setFotoHeroFile] = useState<File | null>(null);
  const [fotoSobreMiFile, setFotoSobreMiFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<PerfilSchema>({
    resolver: zodResolver(perfilSchema),
    defaultValues: {
      nombreCompleto: initialData?.nombreCompleto ?? '',
      inicialesLogo: initialData?.inicialesLogo ?? '',
      telefono: initialData?.telefono ?? '',
      tituloHero: initialData?.tituloHero ?? '',
      perfilTecnicoHero: initialData?.perfilTecnicoHero ?? '',
      descripcionHero: initialData?.descripcionHero ?? '',
      descripcionUnoSobreMi: initialData?.descripcionUnoSobreMi ?? '',
      descripcionDosSobreMi: initialData?.descripcionDosSobreMi ?? '',
      fotoHeroUrl: initialData?.fotoHeroUrl ?? null,
      fotoSobreMiUrl: initialData?.fotoSobreMiUrl ?? null,
      cvUrl: initialData?.cvUrl ?? null,
    },
  });

  // Handlers imágenes
  const onHeroChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]; if (!f) return;
    setFotoHeroFile(f);
    const url = URL.createObjectURL(f);
    setPreviewHero(prev => { if (prev?.startsWith('blob:')) URL.revokeObjectURL(prev); return url; });
    setValue('fotoHeroUrl', null, { shouldDirty: true });
  };

  const onSobreMiChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]; if (!f) return;
    setFotoSobreMiFile(f);
    const url = URL.createObjectURL(f);
    setPreviewSobreMi(prev => { if (prev?.startsWith('blob:')) URL.revokeObjectURL(prev); return url; });
    setValue('fotoSobreMiUrl', null, { shouldDirty: true });
  };

  // Handler CV: sólo nombre/flags (sin vista previa)
  const onCvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]; if (!f) return;
    setCvFile(f);
    setCvName(f.name);
    setCvExistingUrl(null);  // ocultar el existente al elegir uno nuevo
    setValue('cvUrl', null, { shouldDirty: true });
  };

  // Limpiar imágenes (para post-crear)
  const clearHero = () => {
    setFotoHeroFile(null);
    if (previewHero?.startsWith('blob:')) URL.revokeObjectURL(previewHero);
    setPreviewHero(null);
    if (fotoHeroRef.current) fotoHeroRef.current.value = '';
  };

  const clearSobreMi = () => {
    setFotoSobreMiFile(null);
    if (previewSobreMi?.startsWith('blob:')) URL.revokeObjectURL(previewSobreMi);
    setPreviewSobreMi(null);
    if (fotoSobreMiRef.current) fotoSobreMiRef.current.value = '';
  };

  const clearCvSelection = () => {
    setCvFile(null);
    setCvName(null);
    if (cvRef.current) cvRef.current.value = '';
  };

  // Limpia blobs al desmontar (sólo imágenes)
  useEffect(() => {
    return () => {
      if (previewHero?.startsWith('blob:')) URL.revokeObjectURL(previewHero);
      if (previewSobreMi?.startsWith('blob:')) URL.revokeObjectURL(previewSobreMi);
    };
  }, [previewHero, previewSobreMi]);

  // Envío
  const onSubmit = async (data: PerfilSchema) => {
    const payload: PerfilFormValues = {
      ...data,
      fotoHeroFile,
      fotoSobreMiFile,
      cvFile,
    };
    try {
      if (initialData?.id != null) {
        // 👇 FIX: pasar el id al servicio para pegarle a /perfil/{id}
        await updatePerfil(initialData.id, payload);
        toast.success('Perfil actualizado');
      } else {
        await createPerfil(payload);
        toast.success('Perfil creado');
        reset(); clearHero(); clearSobreMi(); clearCvSelection();
      }
      onSuccess();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Error al guardar perfil');
    }
  };

  // nombres mostrados (con elipsis en medio)
  const existingNameFull = fileNameFromUrl(cvExistingUrl);
  const existingNameShort = ellipsizeMiddle(existingNameFull);
  const cvNameShort = ellipsizeMiddle(cvName);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Campos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Nombre completo</label>
          <Input {...register('nombreCompleto')} />
          {errors.nombreCompleto && <p className="text-red-500 text-sm">{errors.nombreCompleto.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Iniciales / Logo</label>
          <Input {...register('inicialesLogo')} />
          {errors.inicialesLogo && <p className="text-red-500 text-sm">{errors.inicialesLogo.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Teléfono</label>
          <Input {...register('telefono')} />
          {errors.telefono && <p className="text-red-500 text-sm">{errors.telefono.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Título (Hero)</label>
          <Input {...register('tituloHero')} />
          {errors.tituloHero && <p className="text-red-500 text-sm">{errors.tituloHero.message}</p>}
        </div>
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium mb-1">Perfil técnico (Hero)</label>
          <Input {...register('perfilTecnicoHero')} />
          {errors.perfilTecnicoHero && <p className="text-red-500 text-sm">{errors.perfilTecnicoHero.message}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Descripción (Hero)</label>
        <Textarea rows={3} {...register('descripcionHero')} />
        {errors.descripcionHero && <p className="text-red-500 text-sm">{errors.descripcionHero.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Descripción 1 (Sobre mí)</label>
        <Textarea rows={3} {...register('descripcionUnoSobreMi')} />
        {errors.descripcionUnoSobreMi && <p className="text-red-500 text-sm">{errors.descripcionUnoSobreMi.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Descripción 2 (Sobre mí)</label>
        <Textarea rows={3} {...register('descripcionDosSobreMi')} />
        {errors.descripcionDosSobreMi && <p className="text-red-500 text-sm">{errors.descripcionDosSobreMi.message}</p>}
      </div>

      {/* Imágenes y CV */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Foto Hero */}
        <div>
          <label className="block text-sm font-medium mb-1">Foto Hero</label>
          {previewHero ? (
            isLocalUrl(previewHero) ? (
              <div className="relative w-32 h-32 overflow-hidden rounded">
                <img src={previewHero} alt="Foto Hero preview" className="w-32 h-32 object-cover" />
                <Button type="button" size="sm" className="absolute top-1 right-1" onClick={clearHero}>X</Button>
              </div>
            ) : (
              <div className="relative w-32 h-32 overflow-hidden rounded">
                <Image alt="Foto Hero" src={previewHero} fill sizes="128px" className="object-cover" />
                <Button type="button" size="sm" className="absolute top-1 right-1" onClick={clearHero}>X</Button>
              </div>
            )
          ) : (
            <Button type="button" onClick={() => fotoHeroRef.current?.click()}>Subir</Button>
          )}
          <input type="file" accept="image/*" ref={fotoHeroRef} className="hidden" onChange={onHeroChange} />
        </div>

        {/* Foto Sobre mí */}
        <div>
          <label className="block text-sm font-medium mb-1">Foto Sobre mí</label>
          {previewSobreMi ? (
            isLocalUrl(previewSobreMi) ? (
              <div className="relative w-32 h-32 overflow-hidden rounded">
                <img src={previewSobreMi} alt="Foto Sobre mí preview" className="w-32 h-32 object-cover" />
                <Button type="button" size="sm" className="absolute top-1 right-1" onClick={clearSobreMi}>X</Button>
              </div>
            ) : (
              <div className="relative w-32 h-32 overflow-hidden rounded">
                <Image alt="Foto Sobre mí" src={previewSobreMi} fill sizes="128px" className="object-cover" />
                <Button type="button" size="sm" className="absolute top-1 right-1" onClick={clearSobreMi}>X</Button>
              </div>
            )
          ) : (
            <Button type="button" onClick={() => fotoSobreMiRef.current?.click()}>Subir</Button>
          )}
          <input type="file" accept="image/*" ref={fotoSobreMiRef} className="hidden" onChange={onSobreMiChange} />
        </div>

        {/* CV (icono + nombre con elipsis; sin preview) */}
        <div>
          <label className="block text-sm font-medium mb-1">CV (PDF)</label>

          {/* 1) Nuevo seleccionado */}
          {cvFile && cvName && (
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-2 border rounded px-2 py-1 min-w-0 max-w-full sm:max-w-[260px]">
                {/* Icono */}
                <svg width="18" height="18" viewBox="0 0 24 24" className="shrink-0">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" fill="currentColor" opacity=".15"/>
                  <path d="M14 2v6h6" fill="currentColor"/>
                </svg>
                <span
                  className="text-sm overflow-hidden text-ellipsis whitespace-nowrap block"
                  title={cvName}
                >
                  {cvNameShort}
                </span>
              </div>
              <div className="ml-auto">
                <Button type="button" size="sm" onClick={() => cvRef.current?.click()}>Reemplazar</Button>
              </div>
            </div>
          )}

          {/* 2) Existe en BD */}
          {!cvFile && cvExistingUrl && (
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-2 border rounded px-2 py-1 min-w-0 max-w-full sm:max-w-[260px]">
                <svg width="18" height="18" viewBox="0 0 24 24" className="shrink-0">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" fill="currentColor" opacity=".15"/>
                  <path d="M14 2v6h6" fill="currentColor"/>
                </svg>
                <span
                  className="text-sm overflow-hidden text-ellipsis whitespace-nowrap block"
                  title={existingNameFull ?? 'CV.pdf'}
                >
                  {existingNameShort ?? 'CV.pdf'}
                </span>
              </div>

              <div className="ml-auto">
                <Button type="button" size="sm" onClick={() => cvRef.current?.click()}>Reemplazar</Button>
              </div>
            </div>
          )}

          {/* 3) No hay nada */}
          {!cvFile && !cvExistingUrl && (
            <Button type="button" onClick={() => cvRef.current?.click()}>Subir</Button>
          )}

          <input type="file" accept="application/pdf" ref={cvRef} className="hidden" onChange={onCvChange} />
        </div>
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? 'Guardando...' : initialData?.id ? 'Actualizar' : 'Guardar'}
      </Button>
    </form>
  );
}
