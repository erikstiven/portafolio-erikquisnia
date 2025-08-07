'use client';

import { useEffect, useState } from 'react';
import { Experiencia } from '@/types/experiencia';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import TablaExperiencia from './TablaExperiencia';
import {
  getExperiencias,
  deleteExperiencia,
} from '@/services/experienciaService';
import ModalExperiencia from './ModalExperiencia';
import { FaPlus } from 'react-icons/fa';

export default function PageExperiencia() {
  const [experiencias, setExperiencias] = useState<Experiencia[]>([]);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [experienciaEditando, setExperienciaEditando] = useState<Experiencia | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchExperiencias = async () => {
    setLoading(true);
    try {
      const res = await getExperiencias();
      setExperiencias(res.data as Experiencia[]);
    } catch (error) {
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
    } catch (error) {
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
          <FaPlus className="text-base" />
          Nuevo
        </Button>
      </div>

      {loading ? (
        <div className="w-full flex justify-center items-center py-16">
          <span className="animate-spin h-6 w-6 border-4 border-blue-500 border-t-transparent rounded-full"></span>
          <span className="ml-2 text-blue-600">Cargando...</span>
        </div>
      ) : (
        <TablaExperiencia
          experiencias={experiencias}
          onEdit={handleEditar}
          onDelete={handleEliminar}
        />
      )}

      <ModalExperiencia
        open={modalAbierto}
        onClose={() => setModalAbierto(false)}
        fetchExperiencias={fetchExperiencias}
        experienciaToEdit={experienciaEditando}
      />
    </div>
  );
}
