'use client';

import { useEffect, useState } from 'react';
import TablaCategorias from './TablaCategorias';
import { getCategorias, deleteCategoria } from '@/services/categoriasService';
import ModalCategorias from './ModalCategoria';
import { Categoria } from '@/types/categoria';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function PageCategorias() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [categoriaEditando, setCategoriaEditando] = useState<Categoria | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchCategorias = async () => {
    setLoading(true);
    try {
      const items = await getCategorias();
      setCategorias(items);
    } catch {
      toast.error('Error al cargar categorías');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategorias(); // Cargar categorías por defecto (página 1)
  }, []);

  const handleNuevo = () => {
    setCategoriaEditando(null);
    setModalAbierto(true);
  };

  const handleEditar = (categoria: Categoria) => {
    setCategoriaEditando(categoria);
    setModalAbierto(true);
  };

  const handleEliminar = async (id: number) => {
    try {
      await deleteCategoria(id);
      toast.success('Categoría eliminada');
      fetchCategorias();
    } catch {
      toast.error('Error al eliminar');
    }
  };

  return (
    <div className="p-4 sm:p-6 space-y-6 w-full">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold">Categorías</h1>
        <Button
          onClick={handleNuevo}
          className="w-full sm:w-auto bg-black text-white text-base font-semibold shadow rounded"
          disabled={loading}
        >
          + Nueva
        </Button>
      </div>

      <div className="bg-white rounded shadow overflow-x-auto">
        <TablaCategorias
          categorias={categorias}
          loading={loading}
          onEdit={handleEditar}
          onDelete={handleEliminar}
        />
      </div>

      <ModalCategorias
        open={modalAbierto}
        onClose={() => setModalAbierto(false)}
        fetchCategorias={fetchCategorias}
        categoriaToEdit={categoriaEditando}
      />
    </div>
  );
}
