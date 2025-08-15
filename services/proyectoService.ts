import api from '@/lib/api';
import type { Proyecto, ProyectoSchema } from '@/types/proyecto';

/**
 * Sube un archivo a Cloudinary y devuelve la URL segura
 */
async function uploadToCloudinary(file: File): Promise<string> {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!;

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', uploadPreset);

  const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) {
    throw new Error('Error al subir la imagen a Cloudinary');
  }

  const data = await res.json();
  return data.secure_url as string;
}

/**
 * Crear proyecto enviando archivo a Cloudinary
 */
export async function createProyectoForm(data: ProyectoSchema, file: File): Promise<Proyecto> {
  const imageUrl = await uploadToCloudinary(file);
  const payload: ProyectoSchema = { ...data, imagenUrl: imageUrl };
  const { data: res } = await api.post<Proyecto>('/proyectos', payload);
  return res;
}

/**
 * Crear proyecto solo con datos JSON
 */
export async function createProyectoJson(data: ProyectoSchema): Promise<Proyecto> {
  const { data: res } = await api.post<Proyecto>('/proyectos', data);
  return res;
}

/**
 * Actualizar proyecto enviando archivo a Cloudinary
 */
export async function updateProyectoForm(id: number, data: ProyectoSchema, file: File): Promise<Proyecto> {
  const imageUrl = await uploadToCloudinary(file);
  const payload: ProyectoSchema = { ...data, imagenUrl: imageUrl };
  const { data: res } = await api.put<Proyecto>(`/proyectos/${id}`, payload);
  return res;
}

/**
 * Actualizar proyecto solo con datos JSON
 */
export async function updateProyectoJson(id: number, data: ProyectoSchema): Promise<Proyecto> {
  const { data: res } = await api.put<Proyecto>(`/proyectos/${id}`, data);
  return res;
}

/**
 * Listar proyectos (soporta array plano o {items:[]})
 */
export async function getProyectos(): Promise<Proyecto[]> {
  const { data } = await api.get<Proyecto[] | { items: Proyecto[] }>('/proyectos');
  return Array.isArray(data) ? data : (data.items ?? []);
}

/**
 * Eliminar proyecto
 */
export async function deleteProyecto(id: number): Promise<void> {
  await api.delete(`/proyectos/${id}`);
}
