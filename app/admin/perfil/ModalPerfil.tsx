// /app/(panel)/perfil/ModalPerfil.tsx
'use client';

import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from '@/components/ui/dialog';
import FormPerfil from './FormPerfil';
import type { PerfilSchema } from '@/types/perfil';

interface Props {
  open: boolean;
  onClose: () => void;
  fetchPerfiles: () => void;
  perfilToEdit?: (PerfilSchema & { id?: number }) | null;
}

export default function ModalPerfil({ open, onClose, fetchPerfiles, perfilToEdit }: Props) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{perfilToEdit ? 'Editar Perfil' : 'Nuevo Perfil'}</DialogTitle>
          <DialogDescription>Completa la información del perfil.</DialogDescription>
        </DialogHeader>
        <FormPerfil
          initialData={perfilToEdit || undefined}
          onSuccess={async () => {
            await fetchPerfiles();
            onClose();
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
