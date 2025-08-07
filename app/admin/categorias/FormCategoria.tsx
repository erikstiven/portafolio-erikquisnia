'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CategoriaSchema, categoriaSchema } from '@/types/categoria';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import {
  createCategoria,
  updateCategoria,
} from '@/services/categoriasService';

type CategoriaWithId = CategoriaSchema & { id?: number };

interface Props {
  initialData?: CategoriaWithId;
  onSuccess: () => void;
}

export default function FormCategoria({ initialData, onSuccess }: Props) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
  } = useForm<CategoriaSchema>({
    resolver: zodResolver(categoriaSchema),
    defaultValues: initialData || {
      nombre: '',
    },
  });

  const onSubmit = async (data: CategoriaSchema) => {
    try {
      if (initialData?.id) {
        await updateCategoria(initialData.id, data);
        toast.success('Categoría actualizada');
      } else {
        await createCategoria(data);
        toast.success('Categoría creada');
        reset(); // limpia solo si es nuevo
      }
      onSuccess();
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || 'Error al guardar categoría'
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 w-full max-w-md mx-auto">
      <div>
        <Input
          placeholder="Nombre de categoría"
          {...register('nombre')}
          className={errors.nombre ? 'border-red-500' : ''}
        />
        {errors.nombre && (
          <p className="text-red-500 text-xs mt-1">{errors.nombre.message}</p>
        )}
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {initialData ? 'Actualizar' : 'Guardar'}
      </Button>
    </form>
  );
}
