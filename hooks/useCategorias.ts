import { useCallback, useEffect, useState } from 'react';
import { getCategoriasPage, createCategoria, updateCategoria, deleteCategoria } from '@/services/categoriasService';
import type { Categoria, CategoriaSchema } from '@/types/categoria';

export function useCategorias() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);

  const fetchCategorias = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getCategoriasPage({ page, pageSize });
      setCategorias(data.items);
      setTotal(data.total);
    } catch (error) {
      console.error('Error cargando categorías:', error);
    } finally {
      setLoading(false);
    }
  }, [page, pageSize]);

  useEffect(() => {
    fetchCategorias();
  }, [fetchCategorias]);

  const addCategoria = async (payload: CategoriaSchema) => {
    await createCategoria(payload);
    fetchCategorias();
  };

  const editCategoria = async (id: number, payload: CategoriaSchema) => {
    await updateCategoria(id, payload);
    fetchCategorias();
  };

  const removeCategoria = async (id: number) => {
    await deleteCategoria(id);
    fetchCategorias();
  };

  return {
    categorias,
    loading,
    page,
    pageSize,
    total,
    setPage,
    setPageSize,
    addCategoria,
    editCategoria,
    removeCategoria,
  };
}
