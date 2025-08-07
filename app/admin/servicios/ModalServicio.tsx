'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import FormServicio from './FormServicio';
import { Servicio } from '@/types/servicio';

interface Props {
  open: boolean;
  onClose: () => void;
  fetchServicios: () => void;
  servicioToEdit?: Servicio | null;
}

export default function ModalServicio({
  open,
  onClose,
  fetchServicios,
  servicioToEdit,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {servicioToEdit ? 'Editar Servicio' : 'Nuevo Servicio'}
          </DialogTitle>
        </DialogHeader>
        <FormServicio
          initialData={servicioToEdit || undefined}
          onSuccess={() => {
            fetchServicios();
            onClose();
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
