import api from '@/lib/api';
import type { Proyecto, ProyectoSchema } from '@/types/proyecto';

export type ApiPage<T> = {
  items: T[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
};

export async function getProyectos(params?: { page?: number; pageSize?: number; includeInactive?: boolean }) {
  const { data } = await api.get<ApiPage<Proyecto>>('/proyectos', { params });
  return data.items;
}

export async function getProyectosPage(params?: { page?: number; pageSize?: number; includeInactive?: boolean }) {
  const { data } = await api.get<ApiPage<Proyecto>>('/proyectos', { params });
  return data;
}

export async function getProyectosCount() {
  const { data } = await api.get<ApiPage<Proyecto>>('/proyectos', { params: { page: 1, pageSize: 1 } });
  return data.total ?? 0;
}

export async function createProyecto(payload: ProyectoSchema) {
  const { data } = await api.post<Proyecto>('/proyectos', {
    ...payload,
    nivel: payload.nivel ?? null,
    activo: true
  });
  return data;
}

export async function updateProyecto(id: number | string, payload: ProyectoSchema) {
  const { data } = await api.put<Proyecto>(`/proyectos/${id}`, {
    ...payload,
    nivel: payload.nivel ?? null
  });
  return data;
}


export async function deleteProyecto(id: number | string) {
  await api.delete<void>(`/proyectos/${id}`);
}
