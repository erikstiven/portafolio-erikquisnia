import api from '@/lib/api';
import type { Experiencia, ExperienciaSchema } from '@/types/experiencia';

export type ApiPage<T> = {
  items: T[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
};

export async function getExperiencias(params?: { page?: number; pageSize?: number; includeInactive?: boolean }) {
  const { data } = await api.get<ApiPage<Experiencia>>('/experiencias', { params });
  return data.items;
}

export async function getExperienciasPage(params?: { page?: number; pageSize?: number; includeInactive?: boolean }) {
  const { data } = await api.get<ApiPage<Experiencia>>('/experiencias', { params });
  return data;
}

export async function getExperienciasCount() {
  const { data } = await api.get<ApiPage<Experiencia>>('/experiencias', { params: { page: 1, pageSize: 1 } });
  return data.total ?? 0;
}

export async function createExperiencia(payload: ExperienciaSchema) {
  const { data: res } = await api.post('/experiencias', { ...payload, activo: true });
  // Adaptarse a una respuesta envuelta `{ data: experiencia }` o
  // directamente el objeto de Experiencia.
  return (res as any).data ?? res;
}

export async function updateExperiencia(id: number | string, payload: ExperienciaSchema) {
  const { data: res } = await api.put(`/experiencias/${id}`, payload);
  return (res as any).data ?? res;
}

export async function deleteExperiencia(id: number | string) {
  await api.delete<void>(`/experiencias/${id}`);
}
