'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { experienciaSchema, ExperienciaSchema } from '@/types/experiencia';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { createExperiencia, updateExperiencia } from '@/services/experienciaService';
import { Switch } from '@/components/ui/switch';

interface Props {
  initialData?: ExperienciaSchema & { id?: number };
  onSuccess: () => void;
}

// Utilidad para formatear fecha (YYYY-MM-DD)
function toDateInputValue(dateString?: string | null) {
  if (!dateString) return '';
  return dateString.substring(0, 10);
}

export default function FormExperiencia({ initialData, onSuccess }: Props) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { isSubmitting, errors },
    reset,
  } = useForm<ExperienciaSchema>({
    resolver: zodResolver(experienciaSchema),
    defaultValues: initialData
      ? {
          ...initialData,
          fechaInicio: toDateInputValue(initialData.fechaInicio),
          fechaFin: toDateInputValue(initialData.fechaFin),
          actualmente: initialData.actualmente ?? false, // <-- NOMBRE CORRECTO
        }
      : {
          puesto: '',
          empresa: '',
          fechaInicio: '',
          fechaFin: '',
          actualmente: false, // <-- NOMBRE CORRECTO
          descripcion: '',
        },
  });

  // Sincroniza el formulario cuando cambias de experiencia a editar
  useEffect(() => {
    if (initialData) {
      reset({
        ...initialData,
        fechaInicio: toDateInputValue(initialData.fechaInicio),
        fechaFin: toDateInputValue(initialData.fechaFin),
        actualmente: initialData.actualmente ?? false,
      });
    }
  }, [initialData, reset]);

  const actualmente = watch('actualmente');

  const onSubmit = async (data: ExperienciaSchema) => {
    try {
      if (initialData?.id) {
        await updateExperiencia(initialData.id, data);
        toast.success('Experiencia actualizada');
      } else {
        await createExperiencia(data);
        toast.success('Experiencia creada');
        reset();
      }
      onSuccess();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Error al guardar experiencia');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 w-full max-w-lg mx-auto">
      {/* Puesto */}
      <div>
        <Input
          placeholder="Puesto o Cargo"
          {...register('puesto')}
          className={errors.puesto ? 'border-red-500' : ''}
        />
        {errors.puesto && (
          <p className="text-red-500 text-xs mt-1">{errors.puesto.message}</p>
        )}
      </div>
      {/* Empresa */}
      <div>
        <Input
          placeholder="Empresa"
          {...register('empresa')}
          className={errors.empresa ? 'border-red-500' : ''}
        />
        {errors.empresa && (
          <p className="text-red-500 text-xs mt-1">{errors.empresa.message}</p>
        )}
      </div>
      {/* Switch Actualmente */}
      <div className="flex items-center gap-2">
        <Switch
          checked={actualmente}
          onCheckedChange={(val) => setValue('actualmente', val)}
          id="actualmente-switch"
        />
        <label htmlFor="actualmente-switch" className="cursor-pointer select-none">
          ¿Actualmente trabajando aquí?
        </label>
      </div>
      {/* Fechas */}
      <div className="flex gap-2">
        <div className="flex-1">
          <label className="text-xs">Fecha de inicio</label>
          <Input
            type="date"
            {...register('fechaInicio')}
            className={errors.fechaInicio ? 'border-red-500' : ''}
          />
          {errors.fechaInicio && (
            <p className="text-red-500 text-xs mt-1">{errors.fechaInicio.message}</p>
          )}
        </div>
        <div className="flex-1">
          <label className="text-xs">Fecha de fin</label>
          <Input
            type="date"
            disabled={actualmente}
            {...register('fechaFin')}
            className={errors.fechaFin ? 'border-red-500' : ''}
          />
          {errors.fechaFin && (
            <p className="text-red-500 text-xs mt-1">{errors.fechaFin.message}</p>
          )}
        </div>
      </div>
      {/* Descripción */}
      <div>
        <Textarea
          placeholder="Descripción breve"
          {...register('descripcion')}
          rows={4}
          className={errors.descripcion ? 'border-red-500' : ''}
        />
        {errors.descripcion && (
          <p className="text-red-500 text-xs mt-1">{errors.descripcion.message}</p>
        )}
      </div>
      <Button type="submit" disabled={isSubmitting} className="w-full">
        {initialData ? 'Actualizar' : 'Guardar'}
      </Button>
    </form>
  );
}
