'use client';

import { useEffect, useState } from 'react';
import { Servicio } from '@/types/servicio';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import TablaServicios from './TablaServicios';
import {
  getServicios,
  deleteServicio,
} from '@/services/servicioService';
import ModalServicio from './ModalServicio';
import { FaPlus } from 'react-icons/fa';

export default function PageServicios() {
  const [servicios, setServicios] = useState<Servicio[]>([]);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [servicioEditando, setServicioEditando] = useState<Servicio | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchServicios = async () => {
    setLoading(true);
    try {
      const res = await getServicios();
      setServicios(res.data as Servicio[]);
    } catch (error) {
      toast.error('Error al cargar servicios');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServicios();
  }, []);

  const handleNuevo = () => {
    setServicioEditando(null);
    setModalAbierto(true);
  };

  const handleEditar = (servicio: Servicio) => {
    setServicioEditando(servicio);
    setModalAbierto(true);
  };

  const handleEliminar = async (id: number) => {
    try {
      await deleteServicio(id);
      toast.success('Servicio eliminado');
      fetchServicios();
    } catch (error) {
      toast.error('Error al eliminar');
    }
  };

  return (
    <div className="p-4 sm:p-6 space-y-6 w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <h1 className="text-2xl font-bold">Servicios</h1>
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
        <TablaServicios
          servicios={servicios}
          onEdit={handleEditar}
          onDelete={handleEliminar}
        />
      )}

      <ModalServicio
        open={modalAbierto}
        onClose={() => setModalAbierto(false)}
        fetchServicios={fetchServicios}
        servicioToEdit={servicioEditando}
      />
    </div>
  );
}
