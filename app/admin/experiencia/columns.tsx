import { ColumnaCrud } from '@/components/ui/TablaCrud';
import { Experiencia } from '@/types/experiencia';

function formateaFecha(fecha: string | null | undefined) {
  if (!fecha) return '';
  return new Date(fecha).toLocaleDateString('es-EC', { year: 'numeric', month: 'short' });
}

export const columnasExperiencia: ColumnaCrud<Experiencia>[] = [
  { key: 'puesto', label: 'Puesto', className: 'max-w-[200px] truncate' },
  { key: 'empresa', label: 'Empresa', className: 'max-w-[200px] truncate' },
  {
    key: 'fechaInicio',
    label: 'Inicio',
    render: (e) => formateaFecha(e.fechaInicio),
    className: 'max-w-[140px] truncate'
  },
  {
    key: 'fechaFin',
    label: 'Fin',
    render: (e) => e.actualmente ? '-' : formateaFecha(e.fechaFin),
    className: 'max-w-[140px] truncate'
  },
  {
    key: 'actualmente',
    label: 'Actual',
    render: (e) =>
      e.actualmente
        ? <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">Sí</span>
        : <span className="px-2 py-1 bg-gray-200 text-gray-700 rounded-full text-xs">No</span>,
    className: 'max-w-[100px] truncate text-center',
  },
];

