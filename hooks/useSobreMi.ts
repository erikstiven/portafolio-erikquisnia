'use client';

import { useEffect, useState } from 'react';
import type { SobreMi } from '@/types/sobreMi';
import { getSobreMi } from '@/services/sobreMiService';

export function useSobreMi() {
  const [data, setData] = useState<SobreMi | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const r = await getSobreMi();
        if (alive) setData(r);
      } catch (e: any) {
        if (alive) setError(e?.message ?? 'Error cargando Sobre Mi');
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, []);

  return { data, loading, error };
}
