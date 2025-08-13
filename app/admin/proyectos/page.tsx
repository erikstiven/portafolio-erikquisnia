'use client';

import { useEffect, useState } from 'react';
import TablaProyectos from './TablaProyectos';
import { getProyectos, deleteProyecto } from '@/services/proyectoService';
import ModalProyecto from './ModalProyecto';
import type { Proyecto } from '@/types/proyecto';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useAuthStore } from '@/store/authStore';

export default function PageProyectos() {
  const token = useAuthStore((state) => state.token); // ajusta según tu auth
  const [proyectos, setProyectos] = useState<Proyecto[]>([]);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [proyectoEditando, setProyectoEditando] = useState<Proyecto | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchProyectos = async () => {
    setLoading(true);
    try {
      const items = await getProyectos();
      setProyectos(items);
    } catch {
      toast.error('Error al cargar proyectos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // sólo carga si hay token/usuario
    if (token) fetchProyectos();
  }, [token]);

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
    } catch {
      toast.error('Error al eliminar');
    }
  };

  return (
    <div className="p-4 sm:p-6 space-y-6 w-full">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold">Proyectos</h1>
        <Button
          onClick={handleNuevo}
          className="w-full sm:w-auto bg-black text-white text-base font-semibold shadow rounded"
          disabled={loading}
        >
          + Nuevo
        </Button>
      </div>

      <div className="bg-white rounded shadow overflow-x-auto">
        <TablaProyectos proyectos={proyectos} loading={loading} onEdit={handleEditar} onDelete={handleEliminar} />
      </div>

      <ModalProyecto
        open={modalAbierto}
        onClose={() => setModalAbierto(false)}
        fetchProyectos={fetchProyectos}
        proyectoToEdit={proyectoEditando}
      />
    </div>
  );
}
