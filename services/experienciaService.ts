import api from '@/lib/api';
import { ExperienciaSchema } from '@/types/experiencia';

export function getExperiencias() {
  return api.get('/experiencias');
}
export function createExperiencia(data: ExperienciaSchema) {
  return api.post('/experiencias', data);
}
export function updateExperiencia(id: number, data: ExperienciaSchema) {
  return api.put(`/experiencias/${id}`, data);
}
export function deleteExperiencia(id: number) {
  return api.delete(`/experiencias/${id}`);
}
