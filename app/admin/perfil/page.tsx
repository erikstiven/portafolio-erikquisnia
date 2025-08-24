// /app/admin/perfil/page.tsx  (fragmento/archivo completo según tu estructura)
'use client';

import React, { useEffect, useState } from 'react';
import TablaPerfil from './TablaPerfil';
import ModalPerfil from './ModalPerfil';
import { getPerfiles, deletePerfil } from '@/services/perfilService';
import type { Perfil } from '@/types/perfil';
import { toast } from 'sonner';

export default function PageAdminPerfiles() {
  const [perfiles, setPerfiles] = useState<Perfil[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [perfilToEdit, setPerfilToEdit] = useState<Perfil | undefined>(undefined);

  const fetchPerfiles = async () => {
    setLoading(true);
    try {
      const res = await getPerfiles();
      setPerfiles(res ?? []);
    } catch (err) {
      console.error('Error cargando perfiles', err);
      setPerfiles([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPerfiles();
  }, []);

  const handleDelete = async () => {
    try {
      await deletePerfil(); // <-- sin id (singleton)
      toast.success('Perfil eliminado correctamente');
      await fetchPerfiles();
      // opcional: cerrar modal si estaba abierto
      setOpenModal(false);
    } catch (err: any) {
      console.error(err);
      toast.error(err?.response?.data?.message || 'Error al eliminar perfil');
    }
  };

  return (
    <div className="p-8">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="mt-4 text-2xl font-semibold">Perfiles</h2>
        </div>

        <div className="flex flex-col items-end gap-4">
          <button
            onClick={() => { setPerfilToEdit(undefined); setOpenModal(true); }}
            className="bg-black text-white px-4 py-2 rounded-md shadow-md"
          >
            + Nueva
          </button>
        </div>
      </div>

      <TablaPerfil
        perfiles={perfiles}
        loading={loading}
        onEdit={(p) => { setPerfilToEdit(p); setOpenModal(true); }}
        onDelete={handleDelete} // <-- le pasamos handleDelete sin id
      />

      <ModalPerfil
        open={openModal}
        onClose={() => setOpenModal(false)}
        fetchPerfiles={fetchPerfiles}
        perfilToEdit={perfilToEdit}
      />
    </div>
  );
}
