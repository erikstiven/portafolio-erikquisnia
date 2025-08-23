// columns.tsx
import { ColumnaCrud } from '@/components/ui/TablaCrud';
import { Perfil } from '@/types/perfil';

function formateaFecha(fecha: string | null | undefined) {
  if (!fecha) return '';
  const d = new Date(fecha);
  return isNaN(d.getTime()) ? '' : d.toLocaleString('es-EC');
}

export const columnasPerfil: ColumnaCrud<Perfil>[] = [
  { key: 'nombreCompleto', label: 'Nombre', className: 'max-w-[200px] truncate' },
  { key: 'telefono', label: 'Teléfono', className: 'max-w-[160px] truncate' },
  { key: 'tituloHero', label: 'Título', className: 'max-w-[160px] truncate' },
  {
    key: 'updatedAt',
    label: 'Actualizado',
    render: (row) => formateaFecha(row.updatedAt),
    className: 'max-w-[160px] truncate',
  },
];
