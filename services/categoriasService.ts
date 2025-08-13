import api from '@/lib/api';
import type { Categoria, CategoriaSchema } from '@/types/categoria';

export type ApiPage<T> = {
  items: T[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
};

// Listado solo como array
export async function getCategorias(params?: { page?: number; pageSize?: number; includeInactive?: boolean }) {
  const { data } = await api.get<ApiPage<Categoria>>('/categorias', { params });
  return data.items;
}

// Página completa
export async function getCategoriasPage(params?: { page?: number; pageSize?: number; includeInactive?: boolean }) {
  const { data } = await api.get<ApiPage<Categoria>>('/categorias', { params });
  return data;
}

// Contador
export async function getCategoriasCount() {
  const { data } = await api.get<ApiPage<Categoria>>('/categorias', { params: { page: 1, pageSize: 1 } });
  return data.total ?? 0;
}

// Crear
export async function createCategoria(payload: CategoriaSchema) {
  const { data } = await api.post<Categoria>('/categorias', { ...payload, activo: true });
  return data;
}

// Actualizar
export async function updateCategoria(id: number | string, payload: CategoriaSchema) {
  const { data } = await api.put<Categoria>(`/categorias/${id}`, payload);
  return data;
}

// Eliminar
export async function deleteCategoria(id: number | string) {
  await api.delete<void>(`/categorias/${id}`);
}
