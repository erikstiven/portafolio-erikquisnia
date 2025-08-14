// columns.tsx
import { ColumnaCrud } from '@/components/ui/TablaCrud';
import { Experiencia } from '@/types/experiencia';

// Utilidad para formatear fechas
function formateaFecha(fecha: string | null | undefined) {
  if (!fecha) return '';
  return new Date(fecha).toLocaleDateString('es-EC', { year: 'numeric', month: 'short' });
}

export const columnasExperiencia: ColumnaCrud<Experiencia>[] = [
  { key: 'puesto', label: 'Puesto' },
  { key: 'empresa', label: 'Empresa' },
  { key: 'fechaInicio', label: 'Inicio', render: (e) => formateaFecha(e.fechaInicio) },
  { key: 'fechaFin', label: 'Fin', render: (e) => e.actualmente ? '-' : formateaFecha(e.fechaFin) },
  {
    key: 'actualmente',
    label: 'Actual',
    render: (e) =>
      e.actualmente
        ? <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">Sí</span>
        : <span className="px-2 py-1 bg-gray-200 text-gray-700 rounded-full text-xs">No</span>,
  },
];
