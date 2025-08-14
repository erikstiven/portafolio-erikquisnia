'use client';

import TablaCrud from '@/components/ui/TablaCrud';
import type { Categoria } from '@/types/categoria';
import { columnasCategoria } from './columns';

interface Props {
  categorias: Categoria[];
  loading?: boolean;
  onEdit: (categoria: Categoria) => void;
  onDelete: (id: number) => void;
}

export default function TablaCategorias({
  categorias,
  loading = false,
  onEdit,
  onDelete
}: Props) {
  return (
    <TablaCrud
      data={categorias}
      columns={columnasCategoria}
      onEdit={onEdit}
      onDelete={onDelete}
      getId={(categoria) => categoria.id}
      loading={loading}
    />
  );
}
