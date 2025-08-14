// hooks/useCategorias.ts
import { useState, useEffect } from 'react';
import { Categoria } from '@/types/categoria';
import { getCategorias } from '@/services/categoriasService';

export const useCategorias = () => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCategorias = async (page = 1) => {
    setLoading(true);
    try {
      const items = await getCategorias(page);
      setCategorias(items);
    } catch (e) {
      setError('Error al cargar las categorías');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategorias(); // Cargar categorías por defecto (página 1)
  }, []);

  return { categorias, loading, error, fetchCategorias };
};
