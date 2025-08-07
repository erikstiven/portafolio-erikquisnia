'use client';

import { useEffect, useState } from 'react';
import { Proyecto } from '@/types/proyecto';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import TablaProyectos from './TablaProyectos';
import {
  getProyectos,
  deleteProyecto,
} from '@/services/proyectoService';
import ModalProyecto from './ModalProyecto';

export default function PageProyectos() {
  const [proyectos, setProyectos] = useState<Proyecto[]>([]);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [proyectoEditando, setProyectoEditando] = useState<Proyecto | null>(null);

  const fetchProyectos = async () => {
    try {
      const res = await getProyectos();
      setProyectos(res.data as Proyecto[]);
    } catch (error) {
      toast.error('Error al cargar proyectos');
    }
  };

  useEffect(() => {
    fetchProyectos();
  }, []);

  const handleNuevo = () => {
    setProyectoEditando(null);
    setModalAbierto(true);
  };

  const handleEditar = (proyecto: Proyecto) => {
    setProyectoEditando(proyecto);
    setModalAbierto(true);
  };

  const handleEliminar = async (id: number) => {
    try {
      await deleteProyecto(id);
      toast.success('Proyecto eliminado');
      fetchProyectos();
    } catch (error) {
      toast.error('Error al eliminar');
    }
  };

  return (
    <div className="p-4 sm:p-6 space-y-6 w-full">
      {/* Header responsive */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold">Proyectos</h1>
        <Button
          onClick={handleNuevo}
          className="w-full sm:w-auto bg-black text-white text-base font-semibold shadow rounded"
        >
          + Nuevo
        </Button>
      </div>

      {/* TablaProyectos: scroll horizontal solo en móvil */}
      <div className="bg-white rounded shadow overflow-x-auto">
        <TablaProyectos
          proyectos={proyectos}
          onEdit={handleEditar}
          onDelete={handleEliminar}
        />
      </div>

      {/* Modal */}
      <ModalProyecto
        open={modalAbierto}
        onClose={() => setModalAbierto(false)}
        fetchProyectos={fetchProyectos}
        proyectoToEdit={proyectoEditando}
      />
    </div>
  );
}
