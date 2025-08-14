'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import FormCategoria from './FormCategoria';
import type { CategoriaSchema } from '@/types/categoria';

interface ModalCategoriaProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: CategoriaSchema) => void;
  categoria?: CategoriaSchema | null;
}

export default function ModalCategoria({ open, onClose, onSave, categoria }: ModalCategoriaProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{categoria ? 'Editar Categoría' : 'Nueva Categoría'}</DialogTitle>
        </DialogHeader>
        <FormCategoria
          defaultValues={categoria || {}}
          onSubmit={(data) => {
            onSave(data);
            onClose();
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
