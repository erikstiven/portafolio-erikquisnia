'use client';

import { columnasProyecto } from './columns';
import TablaCrud from '@/components/ui/TablaCrud';
import { Proyecto } from '@/types/proyecto';

interface Props {
  proyectos: Proyecto[];
  total: number;
  loading: boolean;
  onEdit: (p: Proyecto) => void;
  onDelete: (id: number) => void;
}

export default function TablaProyectos({
  proyectos,
  total,
  loading,
  onEdit,
  onDelete,
}: Props) {
  const getId = (p: Proyecto) => p.id;

  return (
    <TablaCrud
      columns={columnasProyecto}
      data={proyectos}
      getId={getId}
      page={1} // 👈 puedes conectar con paginación real después
      pageSize={10}
      total={total}
      onPageChange={() => {}}
      onPageSizeChange={() => {}}
      loading={loading}
      onEdit={onEdit}
      onDelete={onDelete}
    />
  );
}
