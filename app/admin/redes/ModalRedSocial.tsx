'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogDescription, // ✅ faltaba la coma
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
      <DialogContent className="max-w-md w-full max-h-[90vh] overflow-y-auto rounded-2xl">
        <DialogHeader>
          <DialogTitle>
            {redToEdit ? 'Editar Red Social' : 'Nueva Red Social'}
          </DialogTitle>
          {/* 👇 accesibilidad, no se muestra en pantalla */}
          <DialogDescription className="sr-only">
            Formulario de redes sociales
          </DialogDescription>
        </DialogHeader>

        <FormRedSocial
          initialData={redToEdit || undefined}
          onSuccess={async () => {
            await fetchRedes();
            onClose();
          }}
        />

        <DialogClose className="sr-only" />
      </DialogContent>
    </Dialog>
  );
}
