// /services/perfilService.ts
import api from '@/lib/api';
import type { Perfil, PerfilFormValues } from '@/types/perfil';

/** Normaliza la respuesta del backend para soportar objeto o array */
function normalizeListado(res: any): Perfil[] {
  if (Array.isArray(res)) return res;
  if (Array.isArray(res?.items)) return res.items;
  if (res && typeof res === 'object') return [res as Perfil];
  return [];
}

/** Helpers de debug */
const isFileLike = (v: any) =>
  (typeof File !== 'undefined' && v instanceof File) ||
  (v && typeof v === 'object' && 'name' in v && 'size' in v && 'type' in v);

function dumpFormData(fd: FormData, label: string) {
  const out: Record<string, any> = {};
  for (const [k, v] of fd.entries()) {
    if (isFileLike(v)) {
      out[k] = { kind: 'File', name: (v as File).name, size: (v as File).size, type: (v as File).type };
    } else {
      out[k] = String(v);
    }
  }
  // 👇 Esto lo verás en la consola del navegador
  // Busca "FormData(createPerfil)" o "FormData(updatePerfil)"
  console.log(`FormData(${label}) ->`, out);
}

/** Crear (multipart). En singleton no requiere id. */
export async function createPerfil(data: PerfilFormValues): Promise<Perfil> {
  const form = new FormData();
  // texto
  Object.entries(data).forEach(([k, v]) => {
    if (['fotoHeroFile','fotoSobreMiFile','cvFile'].includes(k)) return;
    if (v !== undefined && v !== null) form.append(k, String(v));
  });
  // archivos si existen
  if (data.fotoHeroFile) form.append('fotoHero', data.fotoHeroFile);
  if (data.fotoSobreMiFile) form.append('fotoSobreMi', data.fotoSobreMiFile);
  if (data.cvFile) form.append('cv', data.cvFile);

  // 🔎 LOG: ver qué se envía
  dumpFormData(form, 'createPerfil');

  try {
    // ✅ NO forzar headers: Axios agrega el boundary correcto
    const { data: res } = await api.post('/perfil', form);
    // La API de Laravel puede envolver el objeto Perfil en `{ data: perfil }`.
    return (res as any).data ?? res;
  } catch (err: any) {
    console.error(
      '[createPerfil] error',
      err?.response?.status,
      err?.response?.data || err?.message
    );
    throw err;
  }
}

/** Actualizar (multipart). En singleton es PUT /perfil */
export async function updatePerfil(data: PerfilFormValues): Promise<Perfil> {
  const form = new FormData();
  Object.entries(data).forEach(([k, v]) => {
    if (['fotoHeroFile','fotoSobreMiFile','cvFile'].includes(k)) return;
    if (v !== undefined && v !== null) form.append(k, String(v));
  });
  if (data.fotoHeroFile) form.append('fotoHero', data.fotoHeroFile);
  if (data.fotoSobreMiFile) form.append('fotoSobreMi', data.fotoSobreMiFile);
  if (data.cvFile) form.append('cv', data.cvFile);

  // 🔎 LOG: ver qué se envía
  dumpFormData(form, 'updatePerfil');

  try {
    // ✅ SIN headers manuales
    const { data: res } = await api.put('/perfil', form);
    return (res as any).data ?? res;
  } catch (err: any) {
    console.error(
      '[updatePerfil] error',
      err?.response?.status,
      err?.response?.data || err?.message
    );
    throw err;
  }
}

/** Listar (o traer el único). Devuelve array para la tabla. */
export async function getPerfiles(): Promise<Perfil[]> {
  const { data } = await api.get('/perfil');
  return normalizeListado(data);
}

/** Obtener por id (si activas REST; en singleton no se usa) */
export async function getPerfilById(id: number): Promise<Perfil | null> {
  try {
    const { data: res } = await api.get(`/perfil/${id}`);
    const perfil = (res as any).data ?? res;
    return perfil ?? null;
  } catch {
    return null;
  }
}

/** Eliminar. Soporta /perfil y /perfil/:id */
export async function deletePerfil(id?: number): Promise<void> {
  try {
    if (id != null) await api.delete(`/perfil/${id}`);
    else await api.delete('/perfil'); // singleton
  } catch (e) {
    if (id != null) {
      await api.delete('/perfil');
    } else {
      throw e;
    }
  }
}
