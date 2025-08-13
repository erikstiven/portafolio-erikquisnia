'use client';

import { useEffect, useState } from 'react';
import ModalRedSocial from './ModalRedSocial';
import TablaRedes from './TablaRedes';
import { RedSocial } from '@/types/redSocial';
import { useAuthStore } from '@/store/authStore';
import { getRedes, deleteRed } from '@/services/redesService';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { FaPlus } from 'react-icons/fa';

export default function PageRedes() {
  const token = useAuthStore((state) => state.token);
  const [open, setOpen] = useState(false);
  const [redToEdit, setRedToEdit] = useState<RedSocial | null>(null);
  const [redes, setRedes] = useState<RedSocial[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchRedes = async () => {
    setLoading(true);
    try {
      const items = await getRedes();   // <- ya es RedSocial[]
      setRedes(items);



    } catch {
      toast.error('Error al obtener redes');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteRed(id);
      fetchRedes();
      toast.success('Red eliminada');
    } catch {
      toast.error('Error al eliminar');
    }
  };

  useEffect(() => {
    if (token) fetchRedes();
  }, [token]);

  return (
    <div className="p-4 sm:p-6 space-y-6 w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <h1 className="text-2xl font-bold">Redes Sociales</h1>
        <Button
          onClick={() => {
            setRedToEdit(null);
            setOpen(true);
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
        <TablaRedes
          redes={redes}
          loading={loading}      // ← ya controla skeletons
          onEdit={(red) => { setRedToEdit(red); setOpen(true); }}
          onDelete={handleDelete}
        />
      )}

      <ModalRedSocial
        open={open}
        onClose={() => setOpen(false)}
        fetchRedes={fetchRedes}
        redToEdit={redToEdit}
      />
    </div>
  );
}
