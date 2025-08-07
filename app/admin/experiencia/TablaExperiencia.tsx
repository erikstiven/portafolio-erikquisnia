'use client';

import TablaCrud, { ColumnaCrud } from '@/components/ui/TablaCrud';
import { columnasExperiencia } from './columns'; // Asegúrate que el path es correcto
import { Experiencia } from '@/types/experiencia';

interface Props {
  experiencias: Experiencia[];
  onEdit: (exp: Experiencia) => void;
  onDelete: (id: number) => void;
}

export default function TablaExperiencia({ experiencias, onEdit, onDelete }: Props) {
  return (
    <TablaCrud
      data={experiencias}
      columns={columnasExperiencia}
      onEdit={onEdit}
      onDelete={onDelete}
      getId={(exp) => exp.id}
    />
  );
}
