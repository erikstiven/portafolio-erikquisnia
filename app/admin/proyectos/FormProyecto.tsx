'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { proyectoSchema, ProyectoSchema } from '@/types/proyecto';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { createProyecto, updateProyecto } from '@/services/proyectoService';
import { getCategorias } from '@/services/categoriasService';
import { useEffect, useState, useRef } from 'react';
import { Categoria } from '@/types/categoria';
import { uploadImage } from '@/lib/upload';

interface Props {
  initialData?: ProyectoSchema & { id?: number };
  onSuccess: () => void;
}

export default function FormProyecto({ initialData, onSuccess }: Props) {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { isSubmitting, errors },
    reset,
  } = useForm<ProyectoSchema>({
    resolver: zodResolver(proyectoSchema),
    defaultValues: initialData || {
      titulo: '',
      descripcion: '',
      tecnologias: '',
      imagenUrl: '',
      demoUrl: '',
      githubUrl: '',
      destacado: false,
      categoriaId: undefined,
      nivel: 'Frontend',
    },
  });

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const res = await getCategorias();
        setCategorias(res.data);
      } catch (error) {
        toast.error('Error al cargar categorías');
      }
    };
    fetchCategorias();
  }, []);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const url = await uploadImage(file);
      setValue('imagenUrl', url, { shouldValidate: true });
      toast.success('Imagen subida con éxito');
    } catch (err) {
      toast.error('Error al subir imagen');
    }
  };

  const onSubmit = async (data: ProyectoSchema) => {
    try {
      if (initialData?.id) {
        await updateProyecto(initialData.id, data);
        toast.success('Proyecto actualizado');
      } else {
        await createProyecto(data);
        toast.success('Proyecto creado');
        reset(); // Resetea si es creación
      }
      onSuccess();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Error al guardar proyecto');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 w-full max-w-lg mx-auto">
      {/* Título */}
      <div>
        <Input
          placeholder="Título del proyecto"
          {...register('titulo')}
          className={errors.titulo ? 'border-red-500' : ''}
        />
        {errors.titulo && <p className="text-red-500 text-xs mt-1">{errors.titulo.message}</p>}
      </div>

      {/* Descripción */}
      <div>
        <Textarea
          placeholder="Descripción"
          {...register('descripcion')}
          className={errors.descripcion ? 'border-red-500' : ''}
        />
        {errors.descripcion && <p className="text-red-500 text-xs mt-1">{errors.descripcion.message}</p>}
      </div>

      {/* Tecnologías */}
      <div>
        <Input
          placeholder="Tecnologías usadas (separadas por coma)"
          {...register('tecnologias')}
          className={errors.tecnologias ? 'border-red-500' : ''}
        />
        {errors.tecnologias && <p className="text-red-500 text-xs mt-1">{errors.tecnologias.message}</p>}
      </div>

      {/* Imagen */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Imagen del proyecto</label>
        <div className="flex items-center gap-4">
          <Button
            type="button"
            className="bg-blue-600 text-white"
            onClick={() => fileInputRef.current?.click()}
          >
            Subir imagen
          </Button>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
          {watch('imagenUrl') && (
            <img
              src={watch('imagenUrl')}
              alt="Previsualización"
              className="w-28 h-20 object-cover rounded-md border shadow"
            />
          )}
        </div>
        {errors.imagenUrl && (
          <p className="text-red-500 text-xs mt-1">{errors.imagenUrl.message}</p>
        )}
      </div>

      {/* Demo URL */}
      <div>
        <Input
          placeholder="URL de demo"
          {...register('demoUrl')}
          className={errors.demoUrl ? 'border-red-500' : ''}
        />
        {errors.demoUrl && <p className="text-red-500 text-xs mt-1">{errors.demoUrl.message}</p>}
      </div>

      {/* GitHub URL */}
      <div>
        <Input
          placeholder="URL de GitHub"
          {...register('githubUrl')}
          className={errors.githubUrl ? 'border-red-500' : ''}
        />
        {errors.githubUrl && <p className="text-red-500 text-xs mt-1">{errors.githubUrl.message}</p>}
      </div>

      {/* Destacado */}
      <div className="flex items-center gap-2">
        <Switch
          checked={watch('destacado')}
          onCheckedChange={(val) => setValue('destacado', val)}
          id="destacado-switch"
        />
        <label htmlFor="destacado-switch" className="cursor-pointer select-none">
          ¿Destacado?
        </label>
      </div>

      {/* Categoría */}
      <div>
        <Select
          onValueChange={(value) => setValue('categoriaId', Number(value))}
          defaultValue={initialData?.categoriaId?.toString()}
        >
          <SelectTrigger className={errors.categoriaId ? 'border-red-500 w-full' : 'w-full'}>
            <SelectValue placeholder="Selecciona una categoría" />
          </SelectTrigger>
          <SelectContent>
            {categorias.map((cat) => (
              <SelectItem key={cat.id} value={cat.id.toString()}>
                {cat.nombre}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.categoriaId && <p className="text-red-500 text-xs mt-1">{errors.categoriaId.message}</p>}
      </div>

      {/* Nivel */}
      <div>
        <Select
          onValueChange={(value) =>
            setValue('nivel', value as 'Frontend' | 'Backend' | 'Fullstack')
          }
          defaultValue={initialData?.nivel?.toString()}
        >
          <SelectTrigger className={errors.nivel ? 'border-red-500 w-full' : 'w-full'}>
            <SelectValue placeholder="Selecciona el nivel" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Frontend">Frontend</SelectItem>
            <SelectItem value="Backend">Backend</SelectItem>
            <SelectItem value="Fullstack">Fullstack</SelectItem>
          </SelectContent>
        </Select>
        {errors.nivel && <p className="text-red-500 text-xs mt-1">{errors.nivel.message}</p>}
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {initialData ? 'Actualizar' : 'Guardar'}
      </Button>
    </form>
  );
}
