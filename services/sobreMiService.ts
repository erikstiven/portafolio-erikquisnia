import api from '@/lib/api';
import type { SobreMi, SobreMiSchema } from '@/types/sobreMi';

export type ApiPage<T> = {
  items: T[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
};

export async function getSobreMi(params?: { page?: number; pageSize?: number; includeInactive?: boolean }) {
  const { data } = await api.get<ApiPage<SobreMi>>('/sobre-mi', { params });
  return data.items;
}

export async function getSobreMiPage(params?: { page?: number; pageSize?: number; includeInactive?: boolean }) {
  const { data } = await api.get<ApiPage<SobreMi>>('/sobre-mi', { params });
  return data;
}

export async function getSobreMiCount() {
  const { data } = await api.get<ApiPage<SobreMi>>('/sobre-mi', { params: { page: 1, pageSize: 1 } });
  return data.total ?? 0;
}

export async function createSobreMi(payload: SobreMiSchema) {
  const { data } = await api.post<SobreMi>('/sobre-mi', { ...payload, activo: true });
  return data;
}

export async function updateSobreMi(id: number | string, payload: SobreMiSchema) {
  const { data } = await api.put<SobreMi>(`/sobre-mi/${id}`, payload);
  return data;
}

export async function deleteSobreMi(id: number | string) {
  await api.delete<void>(`/sobre-mi/${id}`);
}
