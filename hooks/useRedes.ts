'use client';

import { useEffect, useMemo, useState } from 'react';
import { getRedes } from '@/services/redesService';
import type { RedSocial } from '@/types/redSocial';

// normaliza la URL (añade https:// si falta)
const sanitizeUrl = (u: string) => (/^https?:\/\//i.test(u) ? u : `https://${u}`);

export function useRedes() {
  const [data, setData] = useState<RedSocial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      setLoading(true);
      try {
        const raw = await getRedes(); // ← ahora es RedSocial[]
        const cleaned = raw
          .filter(Boolean)
          .filter((r) => r.activo !== false)
          .map((r) => ({ ...r, url: sanitizeUrl(r.url) }));

        if (alive) setData(cleaned);
      } catch (e) {
        if (alive) {
          setError(e);
          setData([]);
        }
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, []);

  // quitar duplicados por URL / nombre
  const redes = useMemo(() => {
    const seen = new Set<string>();
    return data.filter((r) => {
      const key = (r.url || r.nombre).toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }, [data]);

  return { redes, loading, error };
}
