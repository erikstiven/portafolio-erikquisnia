'use client';

import TablaCrud from '@/components/ui/TablaCrud';
import { columnasProyecto } from './columns';
import { Proyecto } from '@/types/proyecto';

interface Props {
  proyectos: Proyecto[];
  onEdit: (proyecto: Proyecto) => void;
  onDelete: (id: number) => void;
}

export default function TablaProyectos({ proyectos, onEdit, onDelete }: Props) {
  return (
    <TablaCrud
      data={proyectos}
      columns={columnasProyecto}
      onEdit={onEdit}
      onDelete={onDelete}
      getId={(p) => p.id}
    />
  );
}
