// app/admin/proyectos/FormProyecto.tsx
'use client';

import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

import {
  proyectoSchema,
  type ProyectoSchema,
  NIVEL_VALUES,
  type Nivel,
} from '@/types/proyecto';
import {
  createProyectoJson,
  updateProyectoJson,
  createProyectoForm,
  updateProyectoForm,
} from '@/services/proyectoService';

interface Props {
  initialData?: Partial<ProyectoSchema> & { id?: number };
  onSuccess: () => void;
}

export default function FormProyecto({ initialData, onSuccess }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(initialData?.imagenUrl ?? null);
  const [portada, setPortada] = useState<File | null>(null);

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
      demoUrl: initialData?.demoUrl ?? null,
      githubUrl: initialData?.githubUrl ?? null,
    },
  });

  // Manejar cambio de imagen: guardar File y mostrar preview
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPortada(file);
    setPreview(url);
    setValue('imagenUrl', null, { shouldDirty: true }); // eliminar URL si se sube archivo
  };

  const removeImage = () => {
    setPortada(null);
    setPreview(null);
    setValue('imagenUrl', null, { shouldDirty: true });
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Enviar formulario: JSON si no hay archivo, FormData si hay archivo
  const onSubmit = async (data: ProyectoSchema) => {
    try {
      if (initialData?.id) {
        if (portada) {
          await updateProyectoForm(initialData.id, data, portada);
        } else {
          await updateProyectoJson(initialData.id, data);
        }
        toast.success('Proyecto actualizado correctamente');
      } else {
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

  const nivelValue = (watch('nivel') as Nivel | null) ?? '';

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Título */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
        <Input {...register('titulo')} />
        {errors.titulo && (
          <p className="text-red-500 text-sm">{errors.titulo.message}</p>
        )}
      </div>

      {/* Descripción */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
        <Textarea {...register('descripcion')} />
        {errors.descripcion && (
          <p className="text-red-500 text-sm">{errors.descripcion.message}</p>
        )}
      </div>

      {/* Tecnologías */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Tecnologías</label>
        <Input {...register('tecnologias')} />
        {errors.tecnologias && (
          <p className="text-red-500 text-sm">{errors.tecnologias.message}</p>
        )}
      </div>

      // Categoría
<div>
  <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
  <Select
    value={watch('categoriaId') == null ? 'none' : String(watch('categoriaId'))}
    onValueChange={(val) => {
      // Si selecciona 'none' → null; de lo contrario, convierte a número
      const parsed = val === 'none' ? null : Number(val);
      setValue('categoriaId', Number.isNaN(parsed) ? null : parsed, {
        shouldDirty: true,
        shouldValidate: true,
      });
    }}
  >
    <SelectTrigger className="w-full">
      <SelectValue placeholder="Selecciona una categoría" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="none">— Sin categoría —</SelectItem>
      {/* Sustituye las opciones estáticas por un map si vienen de la API */}
      <SelectItem value="1">Web</SelectItem>
      <SelectItem value="2">Móvil</SelectItem>
    </SelectContent>
  </Select>
  {errors.categoriaId && (
    <p className="text-red-500 text-sm">{errors.categoriaId.message as any}</p>
  )}
</div>


<div>
  <label className="block text-sm font-medium text-gray-700 mb-1">Nivel</label>
  <Select
    value={watch('nivel') ?? 'none'}
    onValueChange={(val) => {
      // 'none' → null; de lo contrario, el valor seleccionado ('Frontend', etc.)
      const nivel = val === 'none' ? null : (val as Nivel);
      setValue('nivel', nivel, {
        shouldDirty: true,
        shouldValidate: true,
      });
    }}
  >
    <SelectTrigger className="w-full">
      <SelectValue placeholder="Selecciona nivel (opcional)" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="none">— Sin nivel —</SelectItem>
      {NIVEL_VALUES.map((n) => (
        <SelectItem key={n} value={n}>
          {n}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
  {errors.nivel && (
    <p className="text-red-500 text-sm">{errors.nivel.message as any}</p>
  )}
</div>

      {/* Imagen */}
      <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Imagen</label>
        {preview ? (
          <div className="relative w-32 h-32">
            {/* Si no tienes componente Image en tu proyecto, usa <img> normal */}
            <Image src={preview} alt="Preview" fill className="object-cover rounded" />
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
        {errors.demoUrl && (
          <p className="text-red-500 text-sm">{errors.demoUrl.message}</p>
        )}
      </div>

      {/* GitHub URL */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">GitHub URL</label>
        <Input {...register('githubUrl')} />
        {errors.githubUrl && (
          <p className="text-red-500 text-sm">{errors.githubUrl.message}</p>
        )}
      </div>

      {/* Botón */}
      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? 'Guardando...' : initialData?.id ? 'Actualizar' : 'Guardar'}
      </Button>
    </form>
  );
}
