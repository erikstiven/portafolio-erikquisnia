'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import FormProyecto from './FormProyecto';
import { Proyecto } from '@/types/proyecto';

interface Props {
  open: boolean;
  onClose: () => void;
  fetchProyectos: () => void;
  proyectoToEdit?: Proyecto | null;
}

export default function ModalProyecto({
  open,
  onClose,
  fetchProyectos,
  proyectoToEdit,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {proyectoToEdit ? 'Editar Proyecto' : 'Nuevo Proyecto'}
          </DialogTitle>
        </DialogHeader>

        <FormProyecto
          initialData={proyectoToEdit || undefined}
          onSuccess={() => {
            fetchProyectos();
            onClose();
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
