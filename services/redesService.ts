// frontend/services/redesService.ts

import api from '@/lib/api';
import { RedSocialSchema } from '@/types/redSocial';

export const getRedes = () => api.get('/redes');

export const createRed = (data: RedSocialSchema) =>
  api.post('/redes', { ...data, activo: true });

export const updateRed = (id: number | string, data: RedSocialSchema) =>
  api.put(`/redes/${id}`, data);

export const deleteRed = (id: number | string) =>
  api.delete(`/redes/${id}`);
