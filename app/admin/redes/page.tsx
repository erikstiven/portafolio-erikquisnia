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
      const items = await getRedes(); // siempre array normalizado
      setRedes(items);
    } catch (err) {
      console.error('Error al obtener redes:', err);
      toast.error('Error al obtener redes');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    console.log('🗑️ Intentando eliminar red con id:', id);
    try {
      await deleteRed(id);

      // 🔹 Elimina de inmediato en frontend (optimista)
      setRedes((prev) => prev.filter((r) => r.id !== id));

      toast.success('Red eliminada');

      // 🔹 Luego sincroniza con backend
      await fetchRedes();
    } catch (err) {
      console.error('❌ Error al eliminar red:', err);
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

      {/* 👇 La tabla siempre visible, skeletons manejados por loading */}
      <TablaRedes
        redes={redes}
        loading={loading}
        onEdit={(red) => {
          setRedToEdit(red);
          setOpen(true);
        }}
        onDelete={handleDelete}
      />

      <ModalRedSocial
        open={open}
        onClose={() => setOpen(false)}
        fetchRedes={fetchRedes}
        redToEdit={redToEdit}
      />
    </div>
  );
}
