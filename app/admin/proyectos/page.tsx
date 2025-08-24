'use client';

import { useEffect, useState } from 'react';
import { Proyecto } from '@/types/proyecto';
import {
  getProyectos,
  deleteProyecto,
} from '@/services/proyectoService';
import TablaProyectos from './TablaProyectos';
import ModalProyecto from './ModalProyecto';
import { Button } from '@/components/ui/button';
import { FaPlus } from 'react-icons/fa';
import { toast } from 'sonner';

export default function PageProyectos() {
  const [proyectos, setProyectos] = useState<Proyecto[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [proyectoToEdit, setProyectoToEdit] = useState<Proyecto | null>(null);

  const fetchProyectos = async () => {
    setLoading(true);
    try {
      const res = await getProyectos();

      // Normalizamos respuesta: puede ser array o {items,total}
      if (Array.isArray(res)) {
        setProyectos(res);
        setTotal(res.length);
      } else {
        setProyectos(res.items ?? []);
        setTotal(res.total ?? 0);
      }
    } catch (err) {
      console.error(err);
      toast.error('Error al cargar proyectos');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteProyecto(id);
      setProyectos((prev) => prev.filter((p) => p.id !== id));
      setTotal((prev) => prev - 1);
      toast.success('Proyecto eliminado');
    } catch (err) {
      console.error(err);
      toast.error('Error al eliminar');
    }
  };

  useEffect(() => {
    fetchProyectos();
  }, []);

  return (
    <div className="p-4 sm:p-6 space-y-6 w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <h1 className="text-2xl font-bold">Proyectos</h1>
        <Button
          onClick={() => {
            setProyectoToEdit(null);
            setOpen(true);
          }}
          className="w-full sm:w-auto bg-black text-white text-base font-semibold shadow rounded"
          disabled={loading}
        >
          <FaPlus className="mr-2" />
          Nuevo
        </Button>
      </div>

      {/* Tabla */}
      <TablaProyectos
        proyectos={proyectos}
        total={total}
        loading={loading}
        onEdit={(p) => {
          setProyectoToEdit(p);
          setOpen(true);
        }}
        onDelete={handleDelete}
      />

      {/* Modal */}
      <ModalProyecto
        open={open}
        onClose={() => setOpen(false)}
        fetchProyectos={fetchProyectos}
        proyectoToEdit={proyectoToEdit}
      />
    </div>
  );
}
