  // frontend/services/proyectoService.ts
  import api from '@/lib/api';
  import { ProyectoSchema } from '@/types/proyecto';

  export const getProyectos = () => api.get('/proyectos');

  export const createProyecto = (data: ProyectoSchema) =>
    api.post('/proyectos', data);

  export const updateProyecto = (id: number, data: ProyectoSchema) =>
    api.put(`/proyectos/${id}`, data);

  export const deleteProyecto = (id: number) =>
    api.delete(`/proyectos/${id}`);
