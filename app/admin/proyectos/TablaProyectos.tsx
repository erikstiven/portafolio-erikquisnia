// app/admin/proyectos/TablaProyectos.tsx
'use client';

import TablaCrud from '@/components/ui/TablaCrud';
import { columnasProyecto } from './columns';
import type { Proyecto } from '@/types/proyecto';

interface Props {
  proyectos: Proyecto[];
  loading?: boolean;                    // ← nuevo
  onEdit: (proyecto: Proyecto) => void;
  onDelete: (id: number) => void;
}

export default function TablaProyectos({ proyectos, loading = false, onEdit, onDelete }: Props) {
  return (
    <TablaCrud
      data={proyectos}
      columns={columnasProyecto}
      getId={(p) => p.id}
      loading={loading}                 // ← reenvía
      onEdit={onEdit}
      onDelete={onDelete}
    />
  );
}
