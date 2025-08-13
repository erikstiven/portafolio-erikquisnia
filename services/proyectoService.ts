import axios from 'axios';
import type { Proyecto, ProyectoSchema } from '@/types/proyecto';

const API_BASE = '/api/proyectos';

// Obtiene todos los proyectos
export async function getProyectos(): Promise<Proyecto[]> {
  const res = await axios.get<{ items: Proyecto[] }>(API_BASE);
  return res.data.items;
}

// Crea proyecto con JSON (sin imagen)
export async function createProyectoJson(data: ProyectoSchema): Promise<Proyecto> {
  const res = await axios.post<Proyecto>(API_BASE, data);
  return res.data;
}

// Crea proyecto con FormData (con imagen)
export async function createProyectoForm(data: ProyectoSchema, file: File): Promise<Proyecto> {
  const formData = new FormData();
  formData.append('titulo', data.titulo);
  formData.append('descripcion', data.descripcion);
  formData.append('tecnologias', data.tecnologias);
  formData.append('categoriaId', data.categoriaId?.toString() || '');
  formData.append('destacado', data.destacado ? 'true' : 'false');
  formData.append('nivel', data.nivel || '');
  formData.append('demoUrl', data.demoUrl || '');
  formData.append('githubUrl', data.githubUrl || '');
  formData.append('imagen', file);
  const res = await axios.post<Proyecto>(`${API_BASE}/form`, formData);
  return res.data;
}

// Actualiza proyecto con JSON (sin imagen)
export async function updateProyectoJson(id: number, data: ProyectoSchema): Promise<Proyecto> {
  const res = await axios.put<Proyecto>(`${API_BASE}/${id}`, data);
  return res.data;
}

// Actualiza proyecto con FormData (con imagen)
export async function updateProyectoForm(id: number, data: ProyectoSchema, file: File): Promise<Proyecto> {
  const formData = new FormData();
  formData.append('titulo', data.titulo);
  formData.append('descripcion', data.descripcion);
  formData.append('tecnologias', data.tecnologias);
  formData.append('categoriaId', data.categoriaId?.toString() || '');
  formData.append('destacado', data.destacado ? 'true' : 'false');
  formData.append('nivel', data.nivel || '');
  formData.append('demoUrl', data.demoUrl || '');
  formData.append('githubUrl', data.githubUrl || '');
  formData.append('imagen', file);
  const res = await axios.put<Proyecto>(`${API_BASE}/form/${id}`, formData);
  return res.data;
}

// Elimina un proyecto
export async function deleteProyecto(id: number): Promise<void> {
  await axios.delete(`${API_BASE}/${id}`);
}
