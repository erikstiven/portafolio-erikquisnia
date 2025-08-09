// services/redesService.ts
import api from '@/lib/api';
import type { RedSocial, RedSocialSchema } from '@/types/redSocial';

export const getRedes = () => api.get<RedSocial[]>('/redes');

export const createRed = (data: RedSocialSchema) =>
  api.post<RedSocial>('/redes', { ...data, activo: true });

export const updateRed = (id: number | string, data: RedSocialSchema) =>
  api.put<RedSocial>(`/redes/${id}`, data);

export const deleteRed = (id: number | string) =>
  api.delete<void>(`/redes/${id}`);
