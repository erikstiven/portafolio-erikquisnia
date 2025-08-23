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
  // Al crear un proyecto, la API de Laravel devuelve el recurso envuelto
  // en una clave `data` además de meta información. Por eso no tipamos
  // el tipo de respuesta y extraemos `res` como `any`. Si la API
  // devuelve directamente el objeto del proyecto, `res` ya será ese
  // objeto. Si devuelve un objeto con `{ data: {...} }`, usamos ese
  // campo. De lo contrario devolvemos `res` tal cual.
  const { data: res } = await api.post('/proyectos', payload);
  return (res as any).data ?? res;
}

/**
 * Crear proyecto solo con datos JSON
 */
export async function createProyectoJson(data: ProyectoSchema): Promise<Proyecto> {
  // Igual que en createProyectoForm, toleramos que la API devuelva
  // `{ data: proyecto }` o el proyecto directamente.
  const { data: res } = await api.post('/proyectos', data);
  return (res as any).data ?? res;
}

/**
 * Actualizar proyecto enviando archivo a Cloudinary
 */
export async function updateProyectoForm(id: number, data: ProyectoSchema, file: File): Promise<Proyecto> {
  const imageUrl = await uploadToCloudinary(file);
  const payload: ProyectoSchema = { ...data, imagenUrl: imageUrl };
  // El backend puede envolver la respuesta en `{ data: proyecto }`.
  const { data: res } = await api.put(`/proyectos/${id}`, payload);
  return (res as any).data ?? res;
}

/**
 * Actualizar proyecto solo con datos JSON
 */
export async function updateProyectoJson(id: number, data: ProyectoSchema): Promise<Proyecto> {
  // Maneja tanto respuestas con `{ data: proyecto }` como objetos planos
  const { data: res } = await api.put(`/proyectos/${id}`, data);
  return (res as any).data ?? res;
}

/**
 * Listar proyectos (soporta array plano o {items:[]})
 */
export async function getProyectos(): Promise<Proyecto[]> {
  // En el backend Laravel, el listado de proyectos devuelve un objeto
  // con una propiedad `data` (y opcionalmente `meta`). Nuestro
  // frontend anterior aceptaba también `{ items: [] }` o un array
  // plano. Por ello, comprobamos los diferentes formatos y extraemos
  // el arreglo adecuado. Si ninguna opción aplica, devolvemos un
  // arreglo vacío.
  const { data: res } = await api.get('/proyectos');
  if (Array.isArray(res)) return res;
  if (Array.isArray((res as any).data)) return (res as any).data;
  if (Array.isArray((res as any).items)) return (res as any).items;
  return [];
}

/**
 * Eliminar proyecto
 */
export async function deleteProyecto(id: number): Promise<void> {
  await api.delete(`/proyectos/${id}`);
}
