// services/redesService.ts
import api from '@/lib/api';
import type { RedSocial, RedSocialSchema } from '@/types/redSocial';

export type ApiPage<T> = {
  items: T[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
};

// -- Listado: la UI solo trabaja con arrays
export async function getRedes(params?: { page?: number; pageSize?: number; includeInactive?: boolean }) {
  const { data } = await api.get<ApiPage<RedSocial>>('/redes', { params });
  return data.items; // ⬅️ siempre devolvemos array
}

// -- Si alguna vista necesita la página completa (paginación, total, etc.)
export async function getRedesPage(params?: { page?: number; pageSize?: number; includeInactive?: boolean }) {
  const { data } = await api.get<ApiPage<RedSocial>>('/redes', { params });
  return data; // { items, page, pageSize, total, totalPages }
}

// -- Útil para el dashboard (contadores) sin traer toda la lista
export async function getRedesCount() {
  const { data } = await api.get<ApiPage<RedSocial>>('/redes', { params: { page: 1, pageSize: 1 } });
  return data.total ?? 0;
}

// Crear
export async function createRed(payload: RedSocialSchema) {
  const { data } = await api.post<RedSocial>('/redes', { ...payload, activo: true });
  return data;
}

// Actualizar
export async function updateRed(id: number | string, payload: RedSocialSchema) {
  const { data } = await api.put<RedSocial>(`/redes/${id}`, payload);
  return data;
}

// Borrado lógico (el backend marca activo=false y responde 204)
export async function deleteRed(id: number | string) {
  await api.delete<void>(`/redes/${id}`);
}
