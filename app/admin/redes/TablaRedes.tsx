'use client';

import { useState } from 'react';
import TablaCrud from '@/components/ui/TablaCrud';
import { columnasRed } from './columns';
import { RedSocial } from '@/types/redSocial';

interface Props {
  redes: RedSocial[];
  loading?: boolean;
  onEdit: (red: RedSocial) => void;
  onDelete: (id: number) => void;
}

export default function TablaRedes({ redes, loading = false, onEdit, onDelete }: Props) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  return (
    <TablaCrud
      data={redes}
      columns={columnasRed}
      onEdit={onEdit}
      onDelete={(id) => {
        console.log('🔎 Eliminando red con id:', id); 
        onDelete(id);
      }}
      getId={(red) => red.id} 
      loading={loading}
      page={page}
      pageSize={pageSize}
      total={redes.length}
      onPageChange={setPage}
      onPageSizeChange={setPageSize}
    />
  );
}
