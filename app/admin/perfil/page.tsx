'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

import TablaPerfil from './TablaPerfil';
import ModalPerfil from './ModalPerfil';
import type { Perfil } from '@/types/perfil';
import { getPerfiles, deletePerfil } from '@/services/perfilService';
import { useAuthStore } from '@/store/authStore';

export default function PagePerfil() {
  const token = useAuthStore((s) => s.token);

  const [perfiles, setPerfiles] = useState<Perfil[]>([]);
  const [loading, setLoading] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [perfilEdit, setPerfilEdit] = useState<Perfil | null>(null);

  const fetchPerfiles = async () => {
    setLoading(true);
    try {
      const items = await getPerfiles();
      setPerfiles(items);
    } catch (e: any) {
      toast.error(e?.response?.data?.message || 'Error al cargar perfil');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { if (token) fetchPerfiles(); }, [token]);

  const handleNuevo = () => {
    setPerfilEdit(null);
    setModalOpen(true);
  };

  const handleEditar = (perfil: Perfil) => {
    setPerfilEdit(perfil);      // objeto completo con id
    setModalOpen(true);
  };

  const handleEliminar = async (perfil: Perfil) => {
    try {
      await deletePerfil(perfil.id);
      toast.success('Perfil eliminado');
      fetchPerfiles();
    } catch (e: any) {
      toast.error(e?.response?.data?.message || 'Error al eliminar perfil');
    }
  };

  return (
    <div className="p-4 sm:p-6 space-y-6 w-full">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold">Perfil</h1>
        <Button
          onClick={handleNuevo}
          className="w-full sm:w-auto bg-black text-white text-base font-semibold shadow rounded"
          disabled={loading}
        >
          + Nuevo
        </Button>
      </div>

      <TablaPerfil
        perfiles={perfiles}
        loading={loading}
        onEdit={handleEditar}
        onDelete={handleEliminar}
      />

      <ModalPerfil
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        fetchPerfiles={fetchPerfiles}
        perfilToEdit={perfilEdit || undefined}
      />
    </div>
  );
}
