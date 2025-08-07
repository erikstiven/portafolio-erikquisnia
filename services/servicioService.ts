import api from '@/lib/api';
import { ServicioSchema } from '@/types/servicio';

// ✅ QUITA /api
export function getServicios() {
  return api.get('/servicios');
}

export function createServicio(data: ServicioSchema) {
  return api.post('/servicios', data);
}

export function updateServicio(id: number, data: ServicioSchema) {
  return api.put(`/servicios/${id}`, data);
}

export function deleteServicio(id: number) {
  return api.delete(`/servicios/${id}`);
}
