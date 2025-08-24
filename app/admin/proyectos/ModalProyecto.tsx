'use client';

import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog';
import FormProyecto from './FormProyecto';
import { Proyecto } from '@/types/proyecto';
import { getCategorias } from '@/services/categoriasService';
import type { Categoria } from '@/types/categoria';

interface Props {
  open: boolean;
  onClose: () => void;
  fetchProyectos: () => void;
  proyectoToEdit: Proyecto | null; // 👈 ya debe venir mapeado con mapProyecto
}

export default function ModalProyecto({
  open,
  onClose,
  fetchProyectos,
  proyectoToEdit,
}: Props) {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loadingCategorias, setLoadingCategorias] = useState(false);

  useEffect(() => {
    if (open) {
      setLoadingCategorias(true);
      getCategorias()
        .then(setCategorias)
        .catch(() => setCategorias([]))
        .finally(() => setLoadingCategorias(false));
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {proyectoToEdit ? 'Editar proyecto' : 'Nuevo proyecto'}
          </DialogTitle>
          <DialogClose />
        </DialogHeader>

        <FormProyecto
          initialData={proyectoToEdit ?? undefined} // 👈 ya viene en camelCase
          onSuccess={() => {
            fetchProyectos();
            onClose();
          }}
        />

        {loadingCategorias && (
          <div className="text-sm text-gray-500 mt-2">
            Cargando categorías...
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
