'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import FormCategoria from './FormCategoria';
import { Categoria } from '@/types/categoria';

interface Props {
  open: boolean;
  onClose: () => void;
  fetchCategorias: () => void;
  categoriaToEdit?: Categoria | null;
}

export default function ModalCategoria({ open, onClose, fetchCategorias, categoriaToEdit }: Props) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md w-full max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {categoriaToEdit ? 'Editar Categoría' : 'Nueva Categoría'}
          </DialogTitle>
        </DialogHeader>

        <FormCategoria
          initialData={categoriaToEdit || undefined}
          onSuccess={() => {
            fetchCategorias();
            onClose();
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
