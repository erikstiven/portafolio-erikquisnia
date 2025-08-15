// /app/(panel)/perfil/TablaPerfiles.tsx
'use client';

import { useState } from 'react';
import TablaCrud from '@/components/ui/TablaCrud';
import type { Perfil } from '@/types/perfil';
import { columnasPerfil } from './columns';

interface Props {
  perfiles: Perfil[];
  loading: boolean;
  onEdit: (perfil: Perfil) => void;
  onDelete: (id?: number) => Promise<void>;
}

export default function TablaPerfiles({ perfiles, loading, onEdit, onDelete }: Props) {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const total = perfiles.length; // si luego paginas desde API, cámbialo

  const getId = (perfil: Perfil) => perfil.id;

  return (
    <TablaCrud
      columns={columnasPerfil}
      data={perfiles}
      getId={getId}
      page={page}
      pageSize={pageSize}
      total={total}
      onPageChange={setPage}
      onPageSizeChange={setPageSize}
      loading={loading}
      onEdit={onEdit}
      onDelete={onDelete}
    />
  );
}
