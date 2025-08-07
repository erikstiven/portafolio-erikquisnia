'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose
} from '@/components/ui/dialog';
import FormRedSocial from './FormRedSocial';
import { RedSocialSchema } from '@/types/redSocial';

interface Props {
  open: boolean;
  onClose: () => void;
  fetchRedes: () => void;
  redToEdit?: (RedSocialSchema & { id?: string | number }) | null;
}

export default function ModalRedSocial({ open, onClose, fetchRedes, redToEdit }: Props) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md w-full max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {redToEdit ? 'Editar Red Social' : 'Nueva Red Social'}
          </DialogTitle>
          {/* Botón cerrar accesible si tu Dialog lo permite */}
        </DialogHeader>
        <FormRedSocial
          initialData={redToEdit || undefined}
          onSuccess={async () => {
            await fetchRedes();
            onClose();
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
