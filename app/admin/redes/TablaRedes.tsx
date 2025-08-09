'use client';

import TablaCrud from '@/components/ui/TablaCrud';
import { columnasRed } from './columns';
import { RedSocial } from '@/types/redSocial';

interface Props {
  redes: RedSocial[];
  onEdit: (red: RedSocial) => void;
  onDelete: (id: number) => void;
}

export default function TablaRedes({ redes, onEdit, onDelete }: Props) {
  return (
    <TablaCrud
      data={redes}
      columns={columnasRed}
      onEdit={onEdit}
      onDelete={onDelete}
      getId={(red) => red.id}
    />
  );
}
