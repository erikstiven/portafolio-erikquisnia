// components/admin/categorias/FormCategorias.tsx

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { createCategoria, updateCategoria } from '../../../services/categoriasService';

const schema = z.object({
  nombre: z.string().min(3, 'El nombre debe tener al menos 3 caracteres'),
});

type FormData = {
  nombre: string;
};

interface FormCategoriasProps {
  categoria?: { id: number; nombre: string } | null;  // Aceptamos tanto 'null' como 'undefined'
  onClose: () => void;
}

const FormCategorias: React.FC<FormCategoriasProps> = ({ categoria, onClose }) => {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: categoria || { nombre: '' }, // Si no hay categoría, el valor por defecto es un objeto vacío
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      if (categoria) {
        await updateCategoria(categoria.id, data.nombre);
      } else {
        await createCategoria(data.nombre);
      }
      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        Nombre:
        <input type="text" {...register('nombre')} />
        {errors.nombre && <span>{errors.nombre.message}</span>}
      </label>
      <button type="submit" disabled={loading}>
        {categoria ? 'Actualizar' : 'Crear'}
      </button>
    </form>
  );
};

export default FormCategorias;
