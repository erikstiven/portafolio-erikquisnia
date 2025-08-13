'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import FormProyecto from './FormProyecto';
import { ProyectoSchema } from '@/types/proyecto';

interface Props {
  open: boolean;
  onClose: () => void;
  fetchProyectos: () => void;
  proyectoToEdit?: (ProyectoSchema & { id?: number }) | null;
}

export default function ModalProyecto({ open, onClose, fetchProyectos, proyectoToEdit }: Props) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{proyectoToEdit ? 'Editar Proyecto' : 'Nuevo Proyecto'}</DialogTitle>
          <DialogDescription>Completa la información del proyecto.</DialogDescription>
        </DialogHeader>
        <FormProyecto
          initialData={proyectoToEdit || undefined}
          onSuccess={async () => {
            await fetchProyectos();
            onClose();
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
