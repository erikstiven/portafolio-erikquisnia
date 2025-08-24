// hooks/useDashboardData.ts (reemplaza tu versión actual)
'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';

type ApiPage<T> = {
  items?: T[];
  page?: number;
  pageSize?: number;
  total?: number;
  totalPages?: number;
};

interface DashboardData {
  redes: number;
  proyectos: number;
  servicios: number;
  categorias: number;
}

export const useDashboardData = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    (async () => {
      setLoading(true);
      try {
        // pedir página 1 con 1 elemento (intentando varias formas de per-page para compatibilidad)
        const params = { page: 1, per_page: 1, pageSize: 1, perPage: 1 };

        const [rRes, rProy, rServ, rCats] = await Promise.allSettled([
          api.get('/redes', { params }),
          api.get('/proyectos', { params }),
          api.get('/servicios', { params }),
          api.get('/categorias', { params }),
        ]);

        // helper para contar la respuesta en múltiples formatos
        const countResp = (resp: any): number => {
          if (!resp) return 0;

          // axios response -> payload is resp.data
          const payload = resp.data ?? resp;

          if (payload == null) return 0;

          // caso: ya es número
          if (typeof payload === 'number' && Number.isFinite(payload)) return payload;

          // caso: array en raiz
          if (Array.isArray(payload)) return payload.length;

          // caso: payload.data es array (Resource + pagination)
          if (Array.isArray(payload.data)) return payload.data.length;

          // caso: payload.data.items
          if (payload.data && Array.isArray(payload.data.items)) return payload.data.items.length;

          // caso: payload.items
          if (Array.isArray(payload.items)) return payload.items.length;

          // caso: rows (SQL style)
          if (Array.isArray(payload.rows)) return payload.rows.length;

          // caso: meta.total o meta.pagination.total
          if (payload.meta && typeof payload.meta.total === 'number') return payload.meta.total;
          if (payload.meta && payload.meta.pagination && typeof payload.meta.pagination.total === 'number') return payload.meta.pagination.total;

          // caso: top-level total/count
          if (typeof payload.total === 'number') return payload.total;
          if (typeof payload.count === 'number') return payload.count;
          if (typeof payload.total_count === 'number') return payload.total_count;

          // caso: si devuelve un único recurso objeto -> contar como 1 si parece recurso
          if (typeof payload === 'object') {
            if (payload.id || payload.uuid || payload.slug) return 1;
          }

          // fallback: si es objeto, contar keys (útil para map-like responses)
          try {
            if (typeof payload === 'object') return Object.keys(payload).length;
          } catch {
            return 0;
          }

          return 0;
        };

        // resuelve settled results
        const redesPayload = rRes.status === 'fulfilled' ? rRes.value : null;
        const proyPayload  = rProy.status === 'fulfilled' ? rProy.value : null;
        const servPayload  = rServ.status === 'fulfilled' ? rServ.value : null;
        const catsPayload  = rCats.status === 'fulfilled' ? rCats.value : null;

        if (!alive) return;

        // DEBUG: imprime la forma real de la respuesta (quita en producción)
        if (typeof window !== 'undefined') {
          console.debug('[useDashboardData] raw/redes ->', redesPayload?.data ?? redesPayload);
          console.debug('[useDashboardData] raw/proyectos ->', proyPayload?.data ?? proyPayload);
          console.debug('[useDashboardData] raw/servicios ->', servPayload?.data ?? servPayload);
          console.debug('[useDashboardData] raw/categorias ->', catsPayload?.data ?? catsPayload);
        }

        setData({
          redes: countResp(redesPayload),
          proyectos: countResp(proyPayload),
          servicios: countResp(servPayload),
          categorias: countResp(catsPayload),
        });
      } catch (e) {
        console.error('Error al cargar el dashboard:', e);
        if (alive) setData({ redes: 0, proyectos: 0, servicios: 0, categorias: 0 });
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, []);

  return { data, loading };
};
