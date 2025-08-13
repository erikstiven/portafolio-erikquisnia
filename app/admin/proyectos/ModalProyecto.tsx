// app/admin/proyectos/ModalProyecto.tsx
'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import FormProyecto from './FormProyecto';
import type { Proyecto, ProyectoSchema } from '@/types/proyecto';

interface Props {
  open: boolean;
  onClose: () => void;
  fetchProyectos: () => void;
  proyectoToEdit?: Proyecto | null;
}

// Normaliza el tipo del backend -> datos que espera el form
function toFormData(p: Proyecto): (Partial<ProyectoSchema> & { id: number }) {
  return {
    id: p.id,
    titulo: p.titulo,
    descripcion: p.descripcion,
    tecnologias: p.tecnologias,
    categoriaId: p.categoriaId,
    destacado: p.destacado,
 nivel: p.nivel ?? null,

    imagenUrl: p.imagenUrl ?? null,
    demoUrl: p.demoUrl ?? null,
    githubUrl: p.githubUrl ?? null,
  };
}


export default function ModalProyecto({
  open,
  onClose,
  fetchProyectos,
  proyectoToEdit,
}: Props) {
  const initialData = proyectoToEdit ? toFormData(proyectoToEdit) : undefined;

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) onClose();
      }}
    >
      <DialogContent className="max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {proyectoToEdit ? 'Editar Proyecto' : 'Nuevo Proyecto'}
          </DialogTitle>
        </DialogHeader>

        <FormProyecto
          initialData={initialData}
          onSuccess={() => {
            fetchProyectos();
            onClose();
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
