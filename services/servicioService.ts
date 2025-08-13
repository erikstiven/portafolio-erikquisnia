import api from '@/lib/api';
import type { Proyecto, ProyectoSchema } from '@/types/proyecto';

export type ApiPage<T> = {
  items: T[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
};

// Listar
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

// Crear / Actualizar en JSON
export async function createProyectoJson(payload: ProyectoSchema) {
  const { data } = await api.post<Proyecto>('/proyectos', payload);
  return data;
}

export async function updateProyectoJson(id: number | string, payload: ProyectoSchema) {
  const { data } = await api.put<Proyecto>(`/proyectos/${id}`, payload);
  return data;
}

// Crear / Actualizar con FormData (para imagen/archivo)
export async function createProyectoForm(payload: ProyectoSchema, portada?: File) {
  const formData = new FormData();
  Object.entries(payload).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, String(value));
    }
  });
  if (portada) formData.append('portada', portada);

  const { data } = await api.post<Proyecto>('/proyectos', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
}

export async function updateProyectoForm(id: number | string, payload: ProyectoSchema, portada?: File) {
  const formData = new FormData();
  Object.entries(payload).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, String(value));
    }
  });
  if (portada) formData.append('portada', portada);

  const { data } = await api.put<Proyecto>(`/proyectos/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
}

// Eliminar
export async function deleteProyecto(id: number | string) {
  await api.delete<void>(`/proyectos/${id}`);
}
