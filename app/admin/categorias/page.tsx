'use client';

import { useEffect, useState } from 'react';
import { Categoria } from '@/types/categoria';
import { getCategorias, deleteCategoria } from '@/services/categoriasService';
import { toast } from 'sonner';
import TablaCategorias from './TablaCategorias';
import ModalCategoria from './ModalCategoria';
import { Button } from '@/components/ui/button';
import { FaPlus } from 'react-icons/fa';

export default function PageCategorias() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [categoriaEditando, setCategoriaEditando] = useState<Categoria | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchCategorias = async () => {
    setLoading(true);
    try {
      const res = await getCategorias();
      setCategorias(res.data as Categoria[]);
    } catch {
      toast.error('Error al cargar las categorías');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteCategoria(id);
      toast.success('Categoría eliminada');
      fetchCategorias();
    } catch {
      toast.error('Error al eliminar categoría');
    }
  };

  useEffect(() => {
    fetchCategorias();
  }, []);

  return (
    <div className="p-4 sm:p-6 space-y-6 w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <h1 className="text-2xl font-bold">Categorías</h1>
        <Button
          onClick={() => {
            setCategoriaEditando(null);
            setModalOpen(true);
          }}
          className="w-full sm:w-auto bg-black text-white text-base font-semibold shadow rounded"
          disabled={loading}
        >
          <FaPlus className="text-base" />
          Nueva
        </Button>
      </div>

      {loading ? (
        <div className="w-full flex justify-center items-center py-16">
          <span className="animate-spin h-6 w-6 border-4 border-blue-500 border-t-transparent rounded-full"></span>
          <span className="ml-2 text-blue-600">Cargando...</span>
        </div>
      ) : (
        <TablaCategorias
          categorias={categorias}
          onEdit={(cat) => {
            setCategoriaEditando(cat);
            setModalOpen(true);
          }}
          onDelete={handleDelete}
        />
      )}

      <ModalCategoria
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        fetchCategorias={fetchCategorias}
        categoriaToEdit={categoriaEditando}
      />
    </div>
  );
}
