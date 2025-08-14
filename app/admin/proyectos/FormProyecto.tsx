'use client';

import { useRef, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { proyectoSchema, ProyectoSchema, NIVEL_VALUES, Nivel } from '@/types/proyecto';
import { Categoria } from '@/types/categoria'; // crea este tipo si no existe
import { getCategorias } from '@/services/categoriasService';
import {
  createProyectoForm,
  createProyectoJson,
  updateProyectoForm,
  updateProyectoJson
} from '@/services/proyectoService';
import { toast } from 'sonner';


interface Props {
  initialData?: Partial<ProyectoSchema> & { id?: number };
  onSuccess: () => void;
}

export default function FormProyecto({ initialData, onSuccess }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(initialData?.imagenUrl ?? null);
  const [portada, setPortada] = useState<File | null>(null);
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ProyectoSchema>({
    resolver: zodResolver(proyectoSchema),
    defaultValues: {
      titulo: initialData?.titulo ?? '',
      descripcion: initialData?.descripcion ?? '',
      tecnologias: initialData?.tecnologias ?? '',
      categoriaId: initialData?.categoriaId ?? null,
      destacado: initialData?.destacado ?? false,
      nivel: initialData?.nivel ?? null,
      imagenUrl: initialData?.imagenUrl ?? null,
      demoUrl: initialData?.demoUrl ?? '',
      githubUrl: initialData?.githubUrl ?? '',
    },
  });

  // Cargar categorías desde el backend
  useEffect(() => {
    async function load() {
      try {
        const cats = await getCategorias();
        setCategorias(cats);
      } catch (e) {
        console.error('Error cargando categorías', e);
      }
    }
    load();
  }, []);

  // Manejar cambio de imagen: guardar File y mostrar preview
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPortada(file);
    setPreview(url);
    setValue('imagenUrl', null, { shouldDirty: true }); // eliminar URL si se sube archivo
  };

  // Eliminar la imagen actual
  const removeImage = () => {
    setPortada(null);
    setPreview(null);
    setValue('imagenUrl', null, { shouldDirty: true });
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Enviar formulario: JSON si no hay archivo, FormData si hay archivo
  const onSubmit = async (data: ProyectoSchema) => {
    try {
      if (initialData?.id != null) {
        // EDITAR
        if (portada) {
          await updateProyectoForm(initialData.id, data, portada);
        } else {
          await updateProyectoJson(initialData.id, data);
        }
        toast.success('Proyecto actualizado correctamente');
      } else {
        // CREAR
        if (portada) {
          await createProyectoForm(data, portada);
        } else {
          await createProyectoJson(data);
        }
        toast.success('Proyecto creado correctamente');
        reset();
        removeImage();
      }
      onSuccess();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Error al guardar proyecto');
    }
  };

  const categoriaValue = watch('categoriaId') == null ? '0' : String(watch('categoriaId'));
  const nivelValue: Nivel | '0' = (watch('nivel') as Nivel | null) ?? '0';

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Título */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
        <Input {...register('titulo')} />
        {errors.titulo && <p className="text-red-500 text-sm">{errors.titulo.message}</p>}
      </div>

      {/* Descripción */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
        <Textarea {...register('descripcion')} />
        {errors.descripcion && <p className="text-red-500 text-sm">{errors.descripcion.message}</p>}
      </div>

      {/* Tecnologías */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Tecnologías</label>
        <Input {...register('tecnologias')} />
        {errors.tecnologias && <p className="text-red-500 text-sm">{errors.tecnologias.message}</p>}
      </div>

      {/* Categoría */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
        <Select
          value={categoriaValue}
          onValueChange={(val) => {
            const parsed = val === '0' ? null : Number(val);
            setValue('categoriaId', parsed, { shouldDirty: true, shouldValidate: true });
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selecciona una categoría" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0">— Sin categoría —</SelectItem>
            {categorias.map((cat) => (
              <SelectItem key={cat.id} value={String(cat.id)}>
                {cat.nombre}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.categoriaId && <p className="text-red-500 text-sm">{errors.categoriaId.message as any}</p>}
      </div>

      {/* Destacado */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={watch('destacado')}
          onChange={(e) => setValue('destacado', e.target.checked, { shouldDirty: true })}
        />
        <label>Destacado</label>
      </div>

      {/* Nivel */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Nivel</label>
        <Select
          value={nivelValue}
          onValueChange={(val) => {
            setValue('nivel', val === '0' ? null : (val as Nivel), {
              shouldDirty: true,
              shouldValidate: true,
            });
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Selecciona nivel (opcional)" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0">— Sin nivel —</SelectItem>
            {NIVEL_VALUES.map((n) => (
              <SelectItem key={n} value={n}>
                {n}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.nivel && <p className="text-red-500 text-sm">{errors.nivel.message as any}</p>}
      </div>

      {/* Imagen */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Imagen</label>
        {preview ? (
          <div className="relative w-32 h-32">
            <Image
              src={preview}
              alt="Vista previa"
              fill
              sizes="(max-width: 768px) 100vw, 128px"
              className="object-cover rounded"
            />
            <Button
              type="button"
              onClick={removeImage}
              variant="destructive"
              size="sm"
              className="absolute top-1 right-1"
            >
              X
            </Button>
          </div>
        ) : (
          <Button type="button" onClick={() => fileInputRef.current?.click()}>
            Subir imagen
          </Button>
        )}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          className="hidden"
          onChange={handleImageChange}
        />
      </div>

      {/* Demo URL */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Demo URL</label>
        <Input {...register('demoUrl')} />
        {errors.demoUrl && <p className="text-red-500 text-sm">{errors.demoUrl.message}</p>}
      </div>

      {/* GitHub URL */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">GitHub URL</label>
        <Input {...register('githubUrl')} />
        {errors.githubUrl && <p className="text-red-500 text-sm">{errors.githubUrl.message}</p>}
      </div>

      {/* Botón */}
      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? 'Guardando...' : initialData?.id ? 'Actualizar' : 'Guardar'}
      </Button>
    </form>
  );
}
