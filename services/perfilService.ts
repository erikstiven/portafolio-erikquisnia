import api from '@/lib/api';
import type { Perfil, PerfilFormValues } from '@/types/perfil';

/** Normaliza respuesta del backend (objeto o listado) */
function normalizeListado(res: any): Perfil[] {
  if (Array.isArray(res)) return res;
  const payload = (res as any)?.data ?? res;
  if (Array.isArray(payload)) return payload as Perfil[];
  if (payload && typeof payload === 'object') return [payload as Perfil];
  return [];
}

/* util debug */
const isFileLike = (v: any) =>
  (typeof File !== 'undefined' && v instanceof File) ||
  (v && typeof v === 'object' && 'name' in v && 'size' in v && 'type' in v);

function dumpFormData(fd: FormData, label: string) {
  const out: Record<string, any> = {};
  for (const [k, v] of fd.entries()) {
    out[k] = isFileLike(v) ? { kind: 'File', name: (v as File).name } : String(v);
  }
  console.log(`FormData(${label}) ->`, out);
}

/** mapa camelCase (front) -> snake_case (API) */
const TEXT_MAP: Record<string, string> = {
  nombreCompleto: 'nombre_completo',
  inicialesLogo: 'iniciales_logo',
  telefono: 'telefono',
  tituloHero: 'titulo_hero',
  perfilTecnicoHero: 'perfil_tecnico_hero',
  descripcionHero: 'descripcion_hero',
  descripcionUnoSobreMi: 'descripcion_uno_sobre_mi',
  descripcionDosSobreMi: 'descripcion_dos_sobre_mi',
  // urls: sólo lectura
};

/** Crea FormData con texto, archivos y flags */
function buildPerfilFormData(data: PerfilFormValues, forUpdate = false) {
  const form = new FormData();

  // texto -> snake_case
  Object.entries(TEXT_MAP).forEach(([from, to]) => {
    const v = (data as any)[from];
    if (v !== undefined && v !== null && v !== '') form.append(to, String(v));
  });

  // archivos (nombres según API)
  if (data.fotoHeroFile) form.append('avatar', data.fotoHeroFile);
  if (data.fotoSobreMiFile) form.append('foto_sobre_mi', data.fotoSobreMiFile);
  if (data.cvFile) form.append('cv', data.cvFile);

  // flags de borrado
  if (data.removeAvatar) form.append('remove_avatar', '1');
  if (data.removeFotoSobreMi) form.append('remove_foto_sobre_mi', '1');
  if (data.removeCv) form.append('remove_cv', '1');

  // method override para update con multipart
  if (forUpdate) form.append('_method', 'PUT');

  return form;
}

/** Crear perfil (multipart) */
export async function createPerfil(data: PerfilFormValues): Promise<Perfil> {
  const form = buildPerfilFormData(data, false);
  dumpFormData(form, 'createPerfil');
  const { data: res } = await api.post('/perfil', form); // POST /perfil
  return (res as any).data ?? res;
}

/** Actualizar perfil (multipart) -> POST + _method=PUT a /perfil/{id} */
export async function updatePerfil(id: number, data: PerfilFormValues): Promise<Perfil> {
  const form = buildPerfilFormData(data, true);
  dumpFormData(form, 'updatePerfil');
  const { data: res } = await api.post(`/perfil/${id}`, form); // POST /perfil/{id}
  return (res as any).data ?? res;
}

/** Listar/obtener (el backend puede devolver 1 o listado) */
export async function getPerfiles(): Promise<Perfil[]> {
  const { data } = await api.get('/perfil');
  return normalizeListado(data);
}

/** Obtener por id (si usas show) */
export async function getPerfilById(id: number): Promise<Perfil | null> {
  try {
    const { data: res } = await api.get(`/perfil/${id}`);
    return (res as any).data ?? res ?? null;
  } catch {
    return null;
  }
}

/** Eliminar por id (coincide con rutas protegidas) */
export async function deletePerfil(id: number): Promise<void> {
  await api.delete(`/perfil/${id}`);
}
