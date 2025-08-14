// services/categoriasService.ts
import api from '@/lib/api';
import { Categoria } from '@/types/categoria';

export async function getCategorias(page: number = 1) {
  const { data } = await api.get<{ items: Categoria[] }>(`/categorias?page=${page}`);
  return data.items; // Asegúrate de que `data.items` sea un array de Categoria
}

export async function getCategoriasPage(params?: { page?: number; pageSize?: number; includeInactive?: boolean }) {
  const { data } = await api.get<{ items: Categoria[]; total: number; page: number; pageSize: number; totalPages: number }>('/categorias', { params });
  return data;
}

export async function getCategoriasCount() {
  const { data } = await api.get<{ total: number }>('/categorias', { params: { page: 1, pageSize: 1 } });
  return data.total ?? 0;
}

export async function createCategoria(nombre: string) {
  const { data } = await api.post('/categorias', { nombre });
  return data;
}

export async function updateCategoria(id: number, nombre: string) {
  const { data } = await api.put(`/categorias/${id}`, { nombre });
  return data;
}

export async function deleteCategoria(id: number) {
  await api.delete(`/categorias/${id}`);
}
