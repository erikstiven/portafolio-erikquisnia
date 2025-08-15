// /hooks/usePerfiles.ts
'use client';

import { useCallback, useEffect, useState } from 'react';
import { getPerfiles, deletePerfil } from '@/services/perfilService';
import type { Perfil } from '@/types/perfil';

const usePerfiles = () => {
  const [perfiles, setPerfiles] = useState<Perfil[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPerfiles = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getPerfiles();
      setPerfiles(data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Error al cargar perfiles');
    } finally {
      setLoading(false);
    }
  }, []);

  const handleDelete = useCallback(async (id?: number) => {
    setLoading(true);
    try {
      await deletePerfil(id);
      await fetchPerfiles();
      return true;
    } catch (err) {
      console.error(err);
      setError('Error al eliminar perfil');
      return false;
    } finally {
      setLoading(false);
    }
  }, [fetchPerfiles]);

  useEffect(() => { fetchPerfiles(); }, [fetchPerfiles]);

  return { perfiles, loading, error, fetchPerfiles, deletePerfil: handleDelete };
};

export default usePerfiles;
