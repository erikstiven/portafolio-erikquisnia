'use client';

import { useState } from 'react';
import TablaCrud, { ColumnaCrud } from '@/components/ui/TablaCrud';
import { columnasExperiencia } from './columns'; // Asegúrate que el path es correcto
import { Experiencia } from '@/types/experiencia';

interface Props {
  experiencias: Experiencia[];
  onEdit: (exp: Experiencia) => void;
  onDelete: (id: number) => void;
  total: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

export default function TablaExperiencia({
  experiencias,
  onEdit,
  onDelete,
  total,
  onPageChange,
  onPageSizeChange,
}: Props) {
  const [page, setPage] = useState(1); // Página inicial
  const [pageSize, setPageSize] = useState(10); // Tamaño de página inicial

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
      onPageChange={(page: number) => {
        setPage(page);
        onPageChange(page); // Llama la función de cambio de página desde los props
      }}
      onPageSizeChange={(size: number) => {
        setPageSize(size);
        onPageSizeChange(size); // Llama la función de cambio de tamaño de página desde los props
      }}
    />
  );
}
