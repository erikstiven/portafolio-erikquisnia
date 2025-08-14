'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { categoriaSchema, CategoriaSchema } from '@/types/categoria';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/Label';

interface FormCategoriaProps {
  defaultValues?: Partial<CategoriaSchema>;
  onSubmit: (data: CategoriaSchema) => void;
}

export default function FormCategoria({ defaultValues, onSubmit }: FormCategoriaProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<CategoriaSchema>({
    resolver: zodResolver(categoriaSchema),
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="nombre">Nombre</Label>
        <Input id="nombre" {...register('nombre')} />
        {errors.nombre && <p className="text-red-500 text-sm">{errors.nombre.message}</p>}
      </div>

      <div>
        <Label htmlFor="descripcion">Descripción</Label>
        <Input id="descripcion" {...register('descripcion')} />
        {errors.descripcion && <p className="text-red-500 text-sm">{errors.descripcion.message}</p>}
      </div>

      <Button type="submit">Guardar</Button>
    </form>
  );
}
