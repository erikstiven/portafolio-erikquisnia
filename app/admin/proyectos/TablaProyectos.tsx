'use client';

import TablaCrud from '@/components/ui/TablaCrud';
import type { Proyecto } from '@/types/proyecto';
import { columnasProyecto } from './columns';

interface Props {
  proyectos: Proyecto[];
  loading?: boolean;
  onEdit: (proyecto: Proyecto) => void;
  onDelete: (id: number) => void;
}

export default function TablaProyectos({ proyectos, loading = false, onEdit, onDelete }: Props) {
  return (
    <TablaCrud
      data={proyectos}
      columns={columnasProyecto}
      onEdit={onEdit}
      onDelete={onDelete}
      getId={(proyecto) => proyecto.id}
      loading={loading}
    />
  );
}
