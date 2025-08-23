'use client';

import * as React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import FormPerfil from './FormPerfil';
import type { Perfil } from '@/types/perfil';

type Props = {
  open: boolean;
  onClose: () => void;
  fetchPerfiles: () => Promise<void>;
  perfilToEdit?: Perfil; // objeto completo con id cuando editas
};

export default function ModalPerfil({ open, onClose, fetchPerfiles, perfilToEdit }: Props) {
  const isEdit = !!perfilToEdit?.id;

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent
        className="w-full sm:max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl"
      >
        <DialogHeader>
          <DialogTitle>{isEdit ? 'Editar perfil' : 'Nuevo perfil'}</DialogTitle>
          <DialogDescription>
            Completa la información del perfil y guarda los cambios.
          </DialogDescription>
        </DialogHeader>

        <FormPerfil
          initialData={perfilToEdit ? {
            id: perfilToEdit.id,
            nombreCompleto: perfilToEdit.nombreCompleto,
            inicialesLogo: perfilToEdit.inicialesLogo,
            telefono: perfilToEdit.telefono,
            tituloHero: perfilToEdit.tituloHero,
            perfilTecnicoHero: perfilToEdit.perfilTecnicoHero,
            descripcionHero: perfilToEdit.descripcionHero,
            descripcionUnoSobreMi: perfilToEdit.descripcionUnoSobreMi,
            descripcionDosSobreMi: perfilToEdit.descripcionDosSobreMi,
            fotoHeroUrl: perfilToEdit.fotoHeroUrl ?? null,
            fotoSobreMiUrl: perfilToEdit.fotoSobreMiUrl ?? null,
            cvUrl: perfilToEdit.cvUrl ?? null,
          } : undefined}
          onSuccess={async () => {
            await fetchPerfiles();
            onClose();
          }}
        />
      </DialogContent>

    </Dialog>
  );
}
