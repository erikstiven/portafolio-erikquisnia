import api from '@/lib/api';

export interface Categoria {
  id: number;
  nombre: string;
}
export const getCategorias = () =>
  api.get<Categoria[]>('/categorias');

import { CategoriaSchema } from '@/types/categoria';



// Crear nueva categoría
export const createCategoria = (data: CategoriaSchema) =>
  api.post('/categorias', data);

// Actualizar categoría
export const updateCategoria = (id: number, data: CategoriaSchema) =>
  api.put(`/categorias/${id}`, data);

// Eliminar categoría
export const deleteCategoria = (id: number) =>
  api.delete(`/categorias/${id}`);
