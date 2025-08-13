'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { proyectoSchema, ProyectoSchema, NIVEL_VALUES, Nivel } from '@/types/proyecto';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import Image from 'next/image';
import { useState, useRef } from 'react';

interface FormProyectoProps {
  initialData?: Partial<ProyectoSchema> & { id?: number };
  onSuccess: () => void;
}

export default function FormProyecto({ initialData, onSuccess }: FormProyectoProps) {
  const [preview, setPreview] = useState<string | null>(initialData?.imagenUrl || null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const form = useForm<ProyectoSchema>({
    resolver: zodResolver(proyectoSchema),
    defaultValues: {
      titulo: initialData?.titulo ?? '',
      descripcion: initialData?.descripcion ?? '',
      tecnologias: initialData?.tecnologias ?? '',
      categoriaId: initialData?.categoriaId ?? null,
      destacado: initialData?.destacado ?? false,
      nivel: initialData?.nivel ?? null,
      imagenUrl: initialData?.imagenUrl ?? '',
      demoUrl: initialData?.demoUrl ?? '',
      githubUrl: initialData?.githubUrl ?? '',
    },
  });

  const { register, handleSubmit, setValue, watch, formState: { errors } } = form;

  const categoriaValue = watch('categoriaId') == null ? '' : String(watch('categoriaId'));
  const nivelValue: Nivel | '' = (watch('nivel') as Nivel | null) ?? '';

  const onSubmit = (data: ProyectoSchema) => {
    // Aquí iría tu lógica para guardar el proyecto
    onSuccess();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setValue('imagenUrl', '', { shouldDirty: true, shouldValidate: true });
    }
  };

  const removeImage = () => {
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    setValue('imagenUrl', '', { shouldDirty: true, shouldValidate: true });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Título */}
      <div>
        <label>Título</label>
        <Input {...register('titulo')} />
        {errors.titulo && <p className="text-red-500">{errors.titulo.message}</p>}
      </div>

      {/* Descripción */}
      <div>
        <label>Descripción</label>
        <Input {...register('descripcion')} />
        {errors.descripcion && <p className="text-red-500">{errors.descripcion.message}</p>}
      </div>

      {/* Tecnologías */}
      <div>
        <label>Tecnologías</label>
        <Input {...register('tecnologias')} />
        {errors.tecnologias && <p className="text-red-500">{errors.tecnologias.message}</p>}
      </div>

      {/* Categoría */}
      <div>
        <label>Categoría</label>
        <Select
          value={categoriaValue}
          onValueChange={(val) => {
            const parsed = val === '' ? null : Number(val);
            setValue('categoriaId', parsed, { shouldDirty: true, shouldValidate: true });
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecciona una categoría" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Ninguna</SelectItem>
            {/* Aquí deberías mapear tus categorías reales */}
            <SelectItem value="1">Categoría 1</SelectItem>
            <SelectItem value="2">Categoría 2</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Nivel */}
      <div>
        <label>Nivel</label>
        <Select
          value={nivelValue || ''}
          onValueChange={(val) => {
            setValue('nivel', (val === '' ? null : val as Nivel), { shouldDirty: true, shouldValidate: true });
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecciona un nivel" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Ninguno</SelectItem>
            {NIVEL_VALUES.map((nivel) => (
              <SelectItem key={nivel} value={nivel}>{nivel}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Imagen */}
      <div>
        <label>Imagen</label>
        {preview ? (
          <div className="relative w-32 h-32">
            <Image src={preview} alt="Vista previa" fill className="object-cover rounded" />
            <Button type="button" variant="destructive" onClick={removeImage} className="mt-2">
              Eliminar
            </Button>
          </div>
        ) : (
          <Input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageChange} />
        )}
      </div>

      {/* Enlaces */}
      <div>
        <label>Demo URL</label>
        <Input {...register('demoUrl')} />
        {errors.demoUrl && <p className="text-red-500">{errors.demoUrl.message}</p>}
      </div>
      <div>
        <label>GitHub URL</label>
        <Input {...register('githubUrl')} />
        {errors.githubUrl && <p className="text-red-500">{errors.githubUrl.message}</p>}
      </div>

      {/* Botón */}
      <Button type="submit">Guardar</Button>
    </form>
  );
}
