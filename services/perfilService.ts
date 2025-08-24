// /services/perfilService.ts
import api from '@/lib/api';
import type { Perfil, PerfilFormValues } from '@/types/perfil';

/* -------------------- helpers -------------------- */

// snake_case (API) -> camelCase (front)
function toPerfil(row: any): Perfil {
  if (!row) throw new Error('Perfil vacío');

  return {
    id: Number(row.id),
    nombreCompleto: row.nombre_completo ?? row.nombreCompleto ?? '',
    inicialesLogo: row.iniciales_logo ?? row.inicialesLogo ?? '',
    telefono: row.telefono ?? '',
    tituloHero: row.titulo_hero ?? row.tituloHero ?? '',
    perfilTecnicoHero: row.perfil_tecnico_hero ?? row.perfilTecnicoHero ?? '',
    descripcionHero: row.descripcion_hero ?? row.descripcionHero ?? '',
    descripcionUnoSobreMi: row.descripcion_uno_sobre_mi ?? row.descripcionUnoSobreMi ?? '',
    descripcionDosSobreMi: row.descripcion_dos_sobre_mi ?? row.descripcionDosSobreMi ?? '',
    fotoHeroUrl: row.foto_hero_url ?? row.fotoHeroUrl ?? null,
    fotoSobreMiUrl: row.foto_sobre_mi_url ?? row.fotoSobreMiUrl ?? null,
    cvUrl: row.cv_url ?? row.cvUrl ?? null,
    createdAt: row.created_at ?? row.createdAt ?? '',
    updatedAt: row.updated_at ?? row.updatedAt ?? '',
  };
}

// debug form-data (solo en cliente)
const isFileLike = (v: any) =>
  (typeof File !== 'undefined' && v instanceof File) ||
  (v && typeof v === 'object' && 'name' in v && 'size' in v && 'type' in v);

function dumpFormData(fd: FormData, label: string) {
  if (typeof window === 'undefined') return; // evitar en server
  const out: Record<string, any> = {};
  for (const [k, v] of fd.entries()) {
    out[k] = isFileLike(v) ? { kind: 'File', name: (v as File).name } : String(v);
  }
  console.log(`FormData(${label}) ->`, out);
}

/** camelCase -> snake_case para campos de texto */
const TEXT_MAP: Record<string, string> = {
  nombreCompleto: 'nombre_completo',
  inicialesLogo: 'iniciales_logo',
  telefono: 'telefono',
  tituloHero: 'titulo_hero',
  perfilTecnicoHero: 'perfil_tecnico_hero',
  descripcionHero: 'descripcion_hero',
  descripcionUnoSobreMi: 'descripcion_uno_sobre_mi',
  descripcionDosSobreMi: 'descripcion_dos_sobre_mi',
};

/** Construye FormData (texto + archivos + flags) */
function buildPerfilFormData(data: PerfilFormValues, forUpdate = false) {
  const form = new FormData();

  // texto -> snake_case
  Object.entries(TEXT_MAP).forEach(([from, to]) => {
    const v = (data as any)[from];
    if (v !== undefined && v !== null && v !== '') form.append(to, String(v));
  });

  // archivos (nombres esperados por la API)
  if (data.fotoHeroFile) form.append('avatar', data.fotoHeroFile);
  if (data.fotoSobreMiFile) form.append('foto_sobre_mi', data.fotoSobreMiFile);
  if (data.cvFile) form.append('cv', data.cvFile);

  // flags de borrado (opcional)
  if ((data as any).removeAvatar) form.append('remove_avatar', '1');
  if ((data as any).removeFotoSobreMi) form.append('remove_foto_sobre_mi', '1');
  if ((data as any).removeCv) form.append('remove_cv', '1');

  // override para multipart update (Laravel method spoof)
  if (forUpdate) form.append('_method', 'PUT');

  return form;
}

/* -------------------- CRUD -------------------- */

/**
 * Crear (multipart) -> POST /perfil
 */
export async function createPerfil(data: PerfilFormValues): Promise<Perfil> {
  const form = buildPerfilFormData(data, false);
  dumpFormData(form, 'createPerfil');
  try {
    // Dejar que el browser ponga Content-Type (incluyendo boundary)
    const { data: res } = await api.post('/perfil', form);
    const payload = (res as any)?.data ?? res;
    return toPerfil(payload);
  } catch (err: any) {
    // propaga un error con más contexto
    throw err?.response?.data ?? err;
  }
}

/**
 * Actualizar (multipart) -> POST /perfil + _method=PUT
 * (la API de tu backend es singleton: PUT /perfil o POST /perfil + _method=PUT)
 */
export async function updatePerfil(data: PerfilFormValues): Promise<Perfil> {
  const form = buildPerfilFormData(data, true); // añade _method=PUT
  dumpFormData(form, 'updatePerfil');
  try {
    const { data: res } = await api.post('/perfil', form);
    const payload = (res as any)?.data ?? res;
    return toPerfil(payload);
  } catch (err: any) {
    throw err?.response?.data ?? err;
  }
}

/**
 * Listar/obtener (backend puede devolver objeto o array)
 */
export async function getPerfiles(): Promise<Perfil[]> {
  try {
    const { data } = await api.get('/perfil');
    const payload = (data as any)?.data ?? data;
    if (!payload) return [];
    if (Array.isArray(payload)) return payload.map(toPerfil);
    // si backend devuelve objeto único, devolverlo en array
    return [toPerfil(payload)];
  } catch (err: any) {
    if (err?.response?.status === 404) return []; // normaliza “sin datos”
    throw err;
  }
}

/**
 * Obtener por id (compatibilidad):
 * - Si la API soporta GET /perfil/{id} lo usará.
 * - Si no existe, buscará en getPerfiles() y devolverá el primer match por id.
 */
export async function getPerfilById(id?: number): Promise<Perfil | null> {
  if (typeof id === 'number') {
    try {
      const { data } = await api.get(`/perfil/${id}`);
      const payload = (data as any)?.data ?? data;
      return payload ? toPerfil(payload) : null;
    } catch (err: any) {
      if (err?.response?.status !== 404) throw err;
      // fallthrough -> intentar con getPerfiles()
    }
  }

  // fallback: pedir lista y buscar por id (útil si backend devuelve array o objeto único)
  const list = await getPerfiles();
  if (typeof id === 'number') {
    return list.find((p) => p.id === id) ?? null;
  }
  return list.length ? list[0] : null;
}

/**
 * Eliminar perfil:
 * - Si pasas id intentará /perfil/{id}
 * - Si no, llamará DELETE /perfil (singleton)
 */
export async function deletePerfil(id?: number): Promise<void> {
  if (typeof id === 'number') {
    try {
      await api.delete(`/perfil/${id}`);
      return;
    } catch (err: any) {
      if (err?.response?.status !== 404) throw err;
      // si 404, caer al endpoint singleton
    }
  }
  try {
    await api.delete('/perfil');
  } catch (err: any) {
    throw err?.response?.data ?? err;
  }
}
