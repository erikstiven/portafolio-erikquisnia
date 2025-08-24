import api from '@/lib/api';
import type { ProyectoSchema, Proyecto } from '@/types/proyecto';

/** 🔄 Convierte snake_case del backend → camelCase del frontend */
function mapProyecto(apiProyecto: any): Proyecto {
  return {
    id: apiProyecto.id,
    titulo: apiProyecto.titulo,
    descripcion: apiProyecto.descripcion,
    tecnologias: apiProyecto.tecnologias,

    imagenUrl: apiProyecto.imagenUrl ?? apiProyecto.imagen_url ?? null,
    imagenPublicId: apiProyecto.imagenPublicId ?? apiProyecto.imagen_public_id ?? null,

    demoUrl: apiProyecto.demoUrl ?? apiProyecto.demo_url ?? null,
    githubUrl: apiProyecto.githubUrl ?? apiProyecto.github_url ?? null,

    destacado: !!apiProyecto.destacado,
    nivel: apiProyecto.nivel ?? null,

    categoriaId: apiProyecto.categoriaId ?? apiProyecto.categoria_id ?? null,
    categoria: apiProyecto.categoria
      ? { id: apiProyecto.categoria.id, nombre: apiProyecto.categoria.nombre }
      : undefined,

    createdAt: apiProyecto.createdAt ?? apiProyecto.created_at ?? null,
    updatedAt: apiProyecto.updatedAt ?? apiProyecto.updated_at ?? null,
  };
}

/**
 * Crear proyecto con JSON (sin imagen)
 */
export async function createProyectoJson(data: ProyectoSchema): Promise<Proyecto> {
  const payload = {
    titulo: data.titulo,
    descripcion: data.descripcion,
    tecnologias: data.tecnologias,
    categoria_id: data.categoriaId,
    destacado: data.destacado,
    nivel: data.nivel,
    demo_url: data.demoUrl,
    github_url: data.githubUrl,
  };

  const res = await api.post('/proyectos', payload);
  return mapProyecto(res.data);
}

/**
 * Crear proyecto con FormData (con imagen)
 */
export async function createProyectoForm(data: ProyectoSchema, file: File): Promise<Proyecto> {
  const formData = new FormData();
  formData.append('titulo', data.titulo);
  formData.append('descripcion', data.descripcion);
  formData.append('tecnologias', data.tecnologias);
  formData.append('categoria_id', String(data.categoriaId));
  formData.append('destacado', data.destacado ? '1' : '0');
  if (data.nivel) formData.append('nivel', data.nivel);
  if (data.demoUrl) formData.append('demo_url', data.demoUrl);
  if (data.githubUrl) formData.append('github_url', data.githubUrl);
  formData.append('imagen', file);

  const res = await api.post('/proyectos', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return mapProyecto(res.data);
}

/**
 * Actualizar proyecto con JSON (sin imagen nueva)
 */
export async function updateProyectoJson(id: number, data: ProyectoSchema): Promise<Proyecto> {
  const payload = {
    titulo: data.titulo,
    descripcion: data.descripcion,
    tecnologias: data.tecnologias,
    categoria_id: data.categoriaId,
    destacado: data.destacado,
    nivel: data.nivel,
    demo_url: data.demoUrl,
    github_url: data.githubUrl,
    imagen_url: data.imagenUrl, // 👈 conserva imagen existente si no se cambia
  };

  const res = await api.patch(`/proyectos/${id}`, payload);
  return mapProyecto(res.data);
}

/**
 * Actualizar proyecto con FormData (con imagen nueva → POST + _method=PATCH)
 */
export async function updateProyectoForm(id: number, data: ProyectoSchema, file: File): Promise<Proyecto> {
  const formData = new FormData();
  formData.append('titulo', data.titulo);
  formData.append('descripcion', data.descripcion);
  formData.append('tecnologias', data.tecnologias);
  formData.append('categoria_id', String(data.categoriaId));
  formData.append('destacado', data.destacado ? '1' : '0');
  if (data.nivel) formData.append('nivel', data.nivel);
  if (data.demoUrl) formData.append('demo_url', data.demoUrl);
  if (data.githubUrl) formData.append('github_url', data.githubUrl);

  // 👇 Importante para Laravel: forzar POST con _method=PATCH
  formData.append('imagen', file);
  formData.append('_method', 'PATCH');

  const res = await api.post(`/proyectos/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return mapProyecto(res.data);
}

/**
 * Obtener proyectos (lista paginada)
 */
export async function getProyectos(): Promise<{ items: Proyecto[]; total: number }> {
  const res = await api.get<{ data: any[]; meta: { total: number } }>('/proyectos');

  return {
    items: res.data.data.map(mapProyecto),
    total: res.data.meta.total,
  };
}

/**
 * Eliminar proyecto
 */
export async function deleteProyecto(id: number): Promise<void> {
  await api.delete(`/proyectos/${id}`);
}
