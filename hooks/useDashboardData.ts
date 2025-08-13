'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';

type ApiPage<T> = {
  items: T[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
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
    (async () => {
      try {
        // pedimos solo 1 elemento para obtener el "total" sin traer toda la lista
        const params = { page: 1, pageSize: 1 };

        const [r, p, s, c] = await Promise.all([
          api.get<ApiPage<any>>('/redes', { params }),
          api.get<ApiPage<any>>('/proyectos', { params }),
          api.get<ApiPage<any>>('/servicios', { params }),
          api.get<ApiPage<any>>('/categorias', { params }),
        ]);

        // fallback por si algún endpoint aún no devuelve total
        const count = (resp: any) =>
          resp.data?.total ??
          (Array.isArray(resp.data) ? resp.data.length : resp.data?.items?.length ?? 0);

        setData({
          redes: count(r),
          proyectos: count(p),
          servicios: count(s),
          categorias: count(c),
        });
      } catch (e) {
        console.error('Error al cargar el dashboard:', e);
        setData(null);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { data, loading };
};
