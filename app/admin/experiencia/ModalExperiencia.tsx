'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import FormExperiencia from './FormExperiencia';
import { Experiencia } from '@/types/experiencia';

interface Props {
  open: boolean;
  onClose: () => void;
  fetchExperiencias: () => void;
  experienciaToEdit?: Experiencia | null;
}

export default function ModalExperiencia({
  open,
  onClose,
  fetchExperiencias,
  experienciaToEdit,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {experienciaToEdit ? 'Editar Experiencia' : 'Nueva Experiencia'}
          </DialogTitle>
        </DialogHeader>
        <FormExperiencia
          initialData={experienciaToEdit || undefined}
          onSuccess={() => {
            fetchExperiencias();
            onClose();
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
