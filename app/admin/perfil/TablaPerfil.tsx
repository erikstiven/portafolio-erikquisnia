'use client';

import { useState } from 'react';
import TablaCrud from '@/components/ui/TablaCrud';
import { columnasPerfil } from './columns';
import { Perfil } from '@/types/perfil';

interface Props {
  perfiles: Perfil[];
  loading: boolean;
  onEdit: (p: Perfil) => void;
  onDelete?: (id: number) => void;
}

export default function TablaPerfil({ perfiles, loading, onEdit, onDelete }: Props) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const total = perfiles.length;

  return (
    <TablaCrud
      data={perfiles}
      columns={columnasPerfil}
      loading={loading}
      getId={(row) => row.id}
      onEdit={onEdit}
      onDelete={onDelete}
      page={page}
      pageSize={pageSize}
      total={total}
      onPageChange={setPage}
      onPageSizeChange={setPageSize}
    />
  );
}
