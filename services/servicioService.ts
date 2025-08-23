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
  // Cambiamos el endpoint de `/proyectos` a `/servicios` para
  // consumir el recurso de servicios en el backend Laravel. La
  // respuesta puede traer `items` (API antigua) o `data` (Laravel),
  // así que devolvemos el arreglo correspondiente.
  const { data: res } = await api.get('/servicios', { params });
  if (Array.isArray((res as any).data)) return (res as any).data;
  if (Array.isArray((res as any).items)) return (res as any).items;
  if (Array.isArray(res)) return res;
  return [];
}

export async function getProyectosPage(params?: { page?: number; pageSize?: number; includeInactive?: boolean }) {
  // Obtenemos la página de servicios. La API de Laravel devuelve
  // `{ data: [...], meta: {...} }`, mientras que la versión anterior
  // usaba `{ items: [...], ... }`. Devolvemos la respuesta completa
  // para que la UI gestione la paginación.
  const { data: res } = await api.get('/servicios', { params });
  // Si la respuesta tiene `data` o `items`, retornamos el objeto
  // completo; de lo contrario devolvemos tal cual
  return (res as any).data ? res : res;
}

export async function getProyectosCount() {
  // Contar servicios: la API de Laravel puede exponer `total` dentro
  // de `meta` o directamente en la respuesta. Solicitamos una sola
  // página y devolvemos el total.
  const { data: res } = await api.get('/servicios', { params: { page: 1, pageSize: 1 } });
  // Respuesta tipo API antigua: { total, ... }
  if (typeof (res as any).total === 'number') return (res as any).total;
  // Respuesta tipo Laravel: { meta: { total: ... }, data: [...] }
  if ((res as any).meta && typeof (res as any).meta.total === 'number') return (res as any).meta.total;
  return 0;
}

// Crear / Actualizar en JSON
export async function createProyectoJson(payload: ProyectoSchema) {
  // Crear servicio: adaptamos el endpoint y manejamos respuestas
  // envueltas en `{ data: servicio }` o directas.
  const { data: res } = await api.post('/servicios', payload);
  return (res as any).data ?? res;
}

export async function updateProyectoJson(id: number | string, payload: ProyectoSchema) {
  // Actualizar servicio: adaptamos el endpoint y la estructura de
  // respuesta.
  const { data: res } = await api.put(`/servicios/${id}`, payload);
  return (res as any).data ?? res;
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

  // Endpoint `/servicios` y manejo de respuesta envuelta
  const { data: res } = await api.post('/servicios', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return (res as any).data ?? res;
}

export async function updateProyectoForm(id: number | string, payload: ProyectoSchema, portada?: File) {
  const formData = new FormData();
  Object.entries(payload).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, String(value));
    }
  });
  if (portada) formData.append('portada', portada);

  // Endpoint `/servicios/${id}` y extracción de `data` si existe
  const { data: res } = await api.put(`/servicios/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return (res as any).data ?? res;
}

// Eliminar
export async function deleteProyecto(id: number | string) {
  // Eliminar servicio
  await api.delete(`/servicios/${id}`);
}
