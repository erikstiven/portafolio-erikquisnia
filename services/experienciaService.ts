import api from '@/lib/api';
import type { Experiencia, ExperienciaSchema } from '@/types/experiencia';

// Paginación genérica
export type ApiPage<T> = {
  items: T[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
};

// 🔹 Obtener todas las experiencias (trae solo los items)
export async function getExperiencias(params?: { page?: number; pageSize?: number }) {
  const { data } = await api.get<ApiPage<Experiencia>>('/experiencias', { params });
  return data.items; // 👈 solo regresamos el array
}

// 🔹 Obtener con paginación (por si necesitas el objeto completo)
export async function getExperienciasPage(params?: { page?: number; pageSize?: number }) {
  const { data } = await api.get<ApiPage<Experiencia>>('/experiencias', { params });
  return data; // devuelve { items, total, ... }
}

// 🔹 Contar experiencias (rápido para dashboard)
export async function getExperienciasCount() {
  const { data } = await api.get<ApiPage<Experiencia>>('/experiencias', {
    params: { page: 1, pageSize: 1 },
  });
  return data.total ?? 0;
}

// 🔹 Crear experiencia
export async function createExperiencia(payload: ExperienciaSchema) {
  const { data } = await api.post<Experiencia>('/experiencias', payload);
  return data;
}

// 🔹 Actualizar experiencia
export async function updateExperiencia(id: number, payload: ExperienciaSchema) {
  const { data } = await api.put<Experiencia>(`/experiencias/${id}`, payload);
  return data;
}

// 🔹 Eliminar experiencia
export async function deleteExperiencia(id: number) {
  await api.delete(`/experiencias/${id}`);
}
