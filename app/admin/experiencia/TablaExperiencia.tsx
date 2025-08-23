'use client';

import { useState } from 'react';
import TablaCrud from '@/components/ui/TablaCrud';
import { columnasExperiencia } from './columns';
import { Experiencia } from '@/types/experiencia';

interface Props {
  experiencias: Experiencia[];
  onEdit: (exp: Experiencia) => void;
  onDelete: (id: number) => void;
  total: number;
  loading?: boolean; // ✅ añadimos loading opcional
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

export default function TablaExperiencia({
  experiencias,
  onEdit,
  onDelete,
  total,
  loading = false, // ✅ valor por defecto
  onPageChange,
  onPageSizeChange,
}: Props) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  return (
    <TablaCrud
      data={experiencias}
      columns={columnasExperiencia}
      onEdit={onEdit}
      onDelete={onDelete}
      getId={(exp) => exp.id}
      page={page}
      pageSize={pageSize}
      total={total}
      loading={loading} 
      onPageChange={(p) => {
        setPage(p);
        onPageChange(p);
      }}
      onPageSizeChange={(s) => {
        setPageSize(s);
        onPageSizeChange(s);
      }}
    />
  );
}
