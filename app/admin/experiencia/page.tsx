'use client';

import { useEffect, useState } from 'react';
import TablaExperiencia from './TablaExperiencia';
import { getExperiencias, deleteExperiencia } from '@/services/experienciaService';
import ModalExperiencia from './ModalExperiencia';
import { Experiencia } from '@/types/experiencia';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function PageExperiencia() {
  const [experiencias, setExperiencias] = useState<Experiencia[]>([]);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [experienciaEditando, setExperienciaEditando] = useState<Experiencia | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchExperiencias = async () => {
    setLoading(true);
    try {
      const items = await getExperiencias();
      setExperiencias(items);
    } catch {
      toast.error('Error al cargar experiencias');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperiencias();
  }, []);

  const handleNuevo = () => {
    setExperienciaEditando(null);
    setModalAbierto(true);
  };

  const handleEditar = (exp: Experiencia) => {
    setExperienciaEditando(exp);
    setModalAbierto(true);
  };

  const handleEliminar = async (id: number) => {
    try {
      await deleteExperiencia(id);
      toast.success('Experiencia eliminada');
      fetchExperiencias();
    } catch {
      toast.error('Error al eliminar');
    }
  };

  return (
    <div className="p-4 sm:p-6 space-y-6 w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <h1 className="text-2xl font-bold">Experiencia profesional</h1>
        <Button
          onClick={handleNuevo}
          className="w-full sm:w-auto bg-black text-white text-base font-semibold shadow rounded"
          disabled={loading}
        >
          + Nueva
        </Button>
      </div>

      {/* 👇 la tabla maneja los skeletons al recibir loading */}
      <TablaExperiencia
        experiencias={experiencias}
        onEdit={handleEditar}
        onDelete={handleEliminar}
        total={experiencias.length}
        loading={loading}
        onPageChange={(page) => console.log('Page changed:', page)}
        onPageSizeChange={(size) => console.log('Page size changed:', size)}
      />

      <ModalExperiencia
        open={modalAbierto}
        onClose={() => setModalAbierto(false)}
        fetchExperiencias={fetchExperiencias}
        experienciaToEdit={experienciaEditando}
      />
    </div>
  );
}
