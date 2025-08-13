// app/admin/proyectos/FormProyecto.tsx
'use client';

import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

import { proyectoSchema, type ProyectoSchema } from '@/types/proyecto';
import { createProyecto, updateProyecto } from '@/services/proyectoService';

interface Props {
  initialData?: Partial<ProyectoSchema> & { id?: number };
  onSuccess: () => void;
}

export default function FormProyecto({ initialData, onSuccess }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(initialData?.imagenUrl ?? null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting }
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
      githubUrl: initialData?.githubUrl ?? null
    }
  });

  const onSubmit = async (data: ProyectoSchema) => {
    try {
      if (initialData?.id) {
        await updateProyecto(initialData.id, data);
        toast.success('Proyecto actualizado correctamente');
      } else {
        await createProyecto(data);
        toast.success('Proyecto creado correctamente');
      }
      reset();
      setPreview(null);
      onSuccess();
    } catch (error) {
      console.error(error);
      toast.error('Error al guardar el proyecto');
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
    setValue('imagenUrl', url as any); // o manejar como upload real
  };

  const removeImage = () => {
    setPreview(null);
    setValue('imagenUrl', null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Título */}
      <div>
        <Label>Título</Label>
        <Input {...register('titulo')} />
        {errors.titulo && <p className="text-red-500 text-sm">{errors.titulo.message}</p>}
      </div>

      {/* Descripción */}
      <div>
        <Label>Descripción</Label>
        <Textarea {...register('descripcion')} />
        {errors.descripcion && <p className="text-red-500 text-sm">{errors.descripcion.message}</p>}
      </div>

      {/* Tecnologías */}
      <div>
        <Label>Tecnologías</Label>
        <Input {...register('tecnologias')} />
        {errors.tecnologias && <p className="text-red-500 text-sm">{errors.tecnologias.message}</p>}
      </div>

      {/* Categoría */}
      <div>
        <Label>Categoría</Label>
        <Select
          value={String(initialData?.categoriaId ?? '')}
          onValueChange={(value) => setValue('categoriaId', value ? Number(value) : null)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecciona una categoría" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">Web</SelectItem>
            <SelectItem value="2">Móvil</SelectItem>
          </SelectContent>
        </Select>
        {errors.categoriaId && <p className="text-red-500 text-sm">{errors.categoriaId.message}</p>}
      </div>

      {/* Nivel */}
      <div>
        <Label>Nivel</Label>
        <Select
          value={field.value ?? ''}
          onValueChange={(value) => field.onChange(value || null)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecciona un nivel" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Frontend">Frontend</SelectItem>
            <SelectItem value="Backend">Backend</SelectItem>
            <SelectItem value="Fullstack">Fullstack</SelectItem>
          </SelectContent>
        </Select>

        {errors.nivel && <p className="text-red-500 text-sm">{errors.nivel.message}</p>}
      </div>

      {/* Imagen */}
      <div>
        <Label>Imagen</Label>
        {preview ? (
          <div className="relative w-32 h-32">
            <Image src={preview} alt="Preview" fill className="object-cover rounded" />
            <Button type="button" onClick={removeImage} variant="destructive" size="sm" className="absolute top-1 right-1">
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
        <Label>Demo URL</Label>
        <Input {...register('demoUrl')} />
        {errors.demoUrl && <p className="text-red-500 text-sm">{errors.demoUrl.message}</p>}
      </div>

      {/* GitHub URL */}
      <div>
        <Label>GitHub URL</Label>
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
