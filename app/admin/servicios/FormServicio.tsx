'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { servicioSchema, ServicioSchema } from '@/types/servicio';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { createServicio, updateServicio } from '@/services/servicioService';

interface Props {
  initialData?: ServicioSchema & { id?: number };
  onSuccess: () => void;
}

export default function FormServicio({ initialData, onSuccess }: Props) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
  } = useForm<ServicioSchema>({
    resolver: zodResolver(servicioSchema),
    defaultValues: initialData || {
      nombre: '',
      descripcion: '',
      precio: undefined,
    },
  });

  const onSubmit = async (data: ServicioSchema) => {
    try {
      if (initialData?.id) {
        await updateServicio(initialData.id, data);
        toast.success('Servicio actualizado');
      } else {
        await createServicio(data);
        toast.success('Servicio creado');
        reset();
      }
      onSuccess();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Error al guardar servicio');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 w-full max-w-md mx-auto">
      {/* Nombre */}
      <div>
        <Input
          placeholder="Nombre del servicio"
          {...register('nombre')}
          className={errors.nombre ? 'border-red-500' : ''}
        />
        {errors.nombre && (
          <p className="text-red-500 text-xs mt-1">{errors.nombre.message}</p>
        )}
      </div>

      {/* Descripción */}
      <div>
        <Textarea
          placeholder="Descripción"
          {...register('descripcion')}
          className={errors.descripcion ? 'border-red-500' : ''}
        />
        {errors.descripcion && (
          <p className="text-red-500 text-xs mt-1">{errors.descripcion.message}</p>
        )}
      </div>

      {/* Precio */}
      <div>
        <Input
          type="number"
          step="0.01"
          placeholder="Precio"
          {...register('precio', { valueAsNumber: true })}
          className={errors.precio ? 'border-red-500' : ''}
        />
        {errors.precio && (
          <p className="text-red-500 text-xs mt-1">{errors.precio.message}</p>
        )}
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {initialData ? 'Actualizar' : 'Guardar'}
      </Button>
    </form>
  );
}
