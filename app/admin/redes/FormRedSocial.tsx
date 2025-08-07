'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RedSocialSchema, redSocialSchema } from '@/types/redSocial';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { createRed, updateRed } from '@/services/redesService'; 
import { iconMap } from '@/utils/iconMap';

const iconOptions = [
  { value: 'github', label: 'GitHub' },
  { value: 'linkedin', label: 'LinkedIn' },
  { value: 'twitter', label: 'Twitter' },
  { value: 'instagram', label: 'Instagram' },
  { value: 'facebook', label: 'Facebook' },
  { value: 'youtube', label: 'YouTube' },
  { value: 'whatsapp', label: 'WhatsApp' },
  { value: 'telegram', label: 'Telegram' },
  { value: 'tiktok', label: 'TikTok' },
  { value: 'pinterest', label: 'Pinterest' },
];

type RedSocialWithId = RedSocialSchema & { id?: string | number };

interface Props {
  initialData?: RedSocialWithId;
  onSuccess: () => void;
}

export default function FormRedSocial({ initialData, onSuccess }: Props) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { isSubmitting, errors },
    reset,
  } = useForm<RedSocialSchema>({
    resolver: zodResolver(redSocialSchema),
    defaultValues: initialData || {
      nombre: '',
      url: '',
      icono: '',
    },
  });

  const onSubmit = async (data: RedSocialSchema) => {
    try {
      if (initialData?.id) {
        await updateRed(initialData.id, data); 
        toast.success('Red actualizada');
      } else {
        await createRed(data); 
        toast.success('Red creada');
        reset(); // Limpia el form si es creación
      }
      onSuccess();
    } catch (error) {
      toast.error('Error al guardar red');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 w-full max-w-md mx-auto">
      <div>
        <Input
          placeholder="Nombre"
          {...register('nombre')}
          className={errors.nombre ? 'border-red-500' : ''}
        />
        {errors.nombre && <p className="text-red-500 text-xs mt-1">{errors.nombre.message}</p>}
      </div>

      <div>
        <Input
          placeholder="URL"
          {...register('url')}
          className={errors.url ? 'border-red-500' : ''}
        />
        {errors.url && <p className="text-red-500 text-xs mt-1">{errors.url.message}</p>}
      </div>

      <div>
        <Select
          onValueChange={(value) => setValue('icono', value)}
          defaultValue={watch('icono')}
        >
          <SelectTrigger className={errors.icono ? 'border-red-500 w-full' : 'w-full'}>
            <SelectValue placeholder="Selecciona un icono" />
          </SelectTrigger>
          <SelectContent>
            {iconOptions.map((icon) => (
              <SelectItem key={icon.value} value={icon.value}>
                <span className="flex items-center gap-2">
                  {iconMap[icon.value] && (
                    <span className="text-xl">{iconMap[icon.value]}</span>
                  )}
                  {icon.label}
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.icono && <p className="text-red-500 text-xs mt-1">{errors.icono.message}</p>}
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {initialData ? 'Actualizar' : 'Guardar'}
      </Button>
    </form>
  );
}
