import api from '@/lib/api';
import type { RedSocial, RedSocialSchema } from '@/types/redSocial';

// 🔹 Normaliza array (soporta { items:[] }, { data:[] } o [])
function normalizeArray(res: any): RedSocial[] {
  if (Array.isArray(res)) return res;
  if (res?.items) return res.items;
  if (Array.isArray(res?.data)) return res.data;
  if (res?.data?.items) return res.data.items;
  return [];
}

// 🔹 Listar
export async function getRedes(params?: { page?: number; pageSize?: number }) {
  const { data } = await api.get('/redes', { params });
  return normalizeArray(data);
}

// 🔹 Crear
export async function createRed(payload: RedSocialSchema) {
  const { data: res } = await api.post('/redes', payload);
  return (res as any).data ?? res;
}

// 🔹 Actualizar
export async function updateRed(id: number, payload: RedSocialSchema) {
  const { data: res } = await api.put(`/redes/${id}`, payload);
  return (res as any).data ?? res;
}

// 🔹 Eliminar
export async function deleteRed(id: number) {
  await api.delete(`/redes/${id}`);
  return true; // 👈 devolvemos algo para poder manejar estado en frontend
}
