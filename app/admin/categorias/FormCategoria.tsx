'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { categoriaSchema, CategoriaSchema } from '@/types/categoria';
import { createCategoria, updateCategoria } from '@/services/categoriasService';
import { toast } from 'sonner';

interface Props {
  initialData?: Partial<CategoriaSchema> & { id?: number };
  onSuccess: () => void; // Función que se ejecutará tras el éxito de la acción
}

export default function FormCategoria({ initialData, onSuccess }: Props) {
  const { register, handleSubmit, formState: { errors } } = useForm<CategoriaSchema>({
    resolver: zodResolver(categoriaSchema),
    defaultValues: {
      nombre: initialData?.nombre ?? '',  // Cargar el nombre inicial si existe
    },
  });

  const onSubmit = async (data: CategoriaSchema) => {
    try {
      if (initialData?.id) {
        // Editar una categoría existente
        await updateCategoria(initialData.id, data.nombre);
        toast.success('Categoría actualizada');
      } else {
        // Crear una nueva categoría
        await createCategoria(data.nombre);
        toast.success('Categoría creada');
      }
      onSuccess();  // Llamamos la función onSuccess después de crear o editar
    } catch (error) {
      toast.error('Error al guardar categoría');  // Manejo de errores
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Nombre</label>
        <Input {...register('nombre')} />
        {errors.nombre && <p className="text-red-500 text-sm">{errors.nombre.message}</p>} {/* Mostrar errores si existen */}
      </div>
      <Button type="submit">Guardar</Button>
    </form>
  );
}
