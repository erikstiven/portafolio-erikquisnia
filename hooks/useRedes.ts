'use client';

import { useEffect, useMemo, useState } from 'react';
import { getRedes } from '@/services/redesService';
import type { RedSocial } from '@/types/redSocial';

function normalizeWhatsapp(u: string) {
  // si viene solo número, arma wa.me
  const digits = u.replace(/\D/g, '');
  return digits.length >= 10 ? `https://wa.me/${digits}` : u;
}

function sanitizeUrl(u?: string | null) {
  if (!u) return '';                           // <-- evita crash
  let s = u.trim();
  if (/^(\+?\d[\d\s-]{7,})$/.test(s)) s = normalizeWhatsapp(s); // “099…” → wa.me
  if (!/^https?:\/\//i.test(s) && !/^mailto:|^tel:/i.test(s)) {
    s = `https://${s}`;
  }
  return s;
}

export function useRedes() {
  const [data, setData] = useState<RedSocial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      setLoading(true);
      try {
        const raw = await getRedes();                          // espero RedSocial[]
        const list = (Array.isArray(raw) ? raw : [])           // fallback
          .filter(Boolean)
          .filter(r => r?.activo !== false)
          .map(r => ({ ...r, url: sanitizeUrl(r?.url) }))
          .filter(r => !!r.url);                                // <-- ignora sin URL
        if (alive) setData(list);
      } catch (e) {
        if (alive) {
          console.error('[useRedes] error:', e);
          setError(e);
          setData([]);
        }
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, []);

  const redes = useMemo(() => {
    const seen = new Set<string>();
    return data.filter(r => {
      const key = (r.url || r.nombre || '').toLowerCase();
      if (!key || seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }, [data]);

  return { redes, loading, error };
}
