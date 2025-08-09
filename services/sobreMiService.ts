import type { SobreMi } from '@/types/sobreMi';

const BASE = process.env.NEXT_PUBLIC_API_URL ?? '';

export async function getSobreMi(): Promise<SobreMi> {
  const url = BASE ? `${BASE}/api/sobre-mi` : '/api/sobre-mi';
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) throw new Error('No se pudo obtener Sobre Mi');
  return res.json();
}
