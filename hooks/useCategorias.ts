// hooks/useCategorias.ts
import { useState, useEffect } from 'react';
import { Categoria, CategoriaResponse } from '@/types/categoria';

export const useCategorias = () => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCategorias = async (page: number = 1) => {
    setLoading(true);
    try {
      // Hacer la solicitud a la API, el proxy en next.config.js se encargará de redirigir a Express
      const response = await fetch(`/api/categorias?page=${page}`);
      if (!response.ok) {
        throw new Error('Error al obtener las categorías');
      }
      const data: CategoriaResponse = await response.json();
      setCategorias(data.items);
    } catch (err) {
      setError('Error al cargar las categorías');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategorias();
  }, []);

  return { categorias, loading, error, fetchCategorias };
};
