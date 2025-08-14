// hooks/useProyectos.ts
'use client';

import { useEffect, useState } from 'react';
import { getProyectos } from '@/services/proyectoService';
import type { Proyecto } from '@/types/proyecto';

export function useProyectos() {
  const [data, setData] = useState<Proyecto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);
  
  useEffect(() => {
    let alive = true;
    (async () => {
      setLoading(true);
      try {
        const items = await getProyectos();
        if (alive) setData(items);
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

  return { proyectos: data, loading, error };
}