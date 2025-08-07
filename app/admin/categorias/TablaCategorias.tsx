'use client';

import TablaCrud from '@/components/ui/TablaCrud';
import { columnasCategoria } from './columns';
import { Categoria } from '@/types/categoria';

interface Props {
  categorias: Categoria[];
  onEdit: (cat: Categoria) => void;
  onDelete: (id: number) => void;
}

export default function TablaCategorias({ categorias, onEdit, onDelete }: Props) {
  return (
    <TablaCrud
      data={categorias}
      columns={columnasCategoria}
      onEdit={onEdit}
      onDelete={onDelete}
      getId={(cat) => cat.id}
    />
  );
}
