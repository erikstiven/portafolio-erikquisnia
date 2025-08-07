'use client';

import TablaCrud from '@/components/ui/TablaCrud';
import { columnasServicio } from './columns';
import { Servicio } from '@/types/servicio';

interface Props {
  servicios: Servicio[];
  onEdit: (servicio: Servicio) => void;
  onDelete: (id: number) => void;
}

export default function TablaServicios({ servicios, onEdit, onDelete }: Props) {
  return (
    <TablaCrud
      data={servicios}
      columns={columnasServicio}
      onEdit={onEdit}
      onDelete={onDelete}
      getId={(s) => s.id}
    />
  );
}
