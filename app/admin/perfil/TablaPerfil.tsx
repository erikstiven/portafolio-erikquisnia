'use client';

import TablaCrud from '@/components/ui/TablaCrud';
import { columnasPerfil } from './columns';
import type { Perfil } from '@/types/perfil';

interface Props {
  perfiles: Perfil[];
  total?: number;
  loading?: boolean;
  onEdit: (p: Perfil) => void;
  onDelete: (id?: number) => void; // singleton: id opcional
}

export default function TablaPerfil({
  perfiles,
  total = perfiles.length,
  loading = false,
  onEdit,
  onDelete,
}: Props) {
  const getId = (p: Perfil) => p.id;

  return (
    <TablaCrud
      columns={columnasPerfil}
      data={perfiles}
      getId={getId}
      page={1} // si tienes paginación real, conéctala después
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
