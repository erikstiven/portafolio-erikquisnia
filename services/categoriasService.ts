import api from '@/lib/api';

import type { Categoria, CategoriaSchema } from '@/types/categoria';
export type Categoria = {
  id: number;
  nombre: string;
};

export type ApiResponse<T> = {
  items: T[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
};

export async function getCategorias(): Promise<Categoria[]> {
  const res = await fetch('http://localhost:4000/api/categorias', {
    cache: 'no-store', // evita cache SSR
  });

  if (!res.ok) {
    throw new Error('Error al obtener categorías');
  }

  const data: ApiResponse<Categoria> = await res.json();
  return data.items; // devolvemos solo el array
}
