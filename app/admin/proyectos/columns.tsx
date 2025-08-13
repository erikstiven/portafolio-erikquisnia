'use client';

import type { ColumnaCrud } from '@/components/ui/TablaCrud';
import type { Proyecto } from '@/types/proyecto';

/** Columnas adaptadas a TablaCrud */
export const columnasProyecto: ColumnaCrud<Proyecto>[] = [
  {
    key: 'titulo',
    label: 'Título',
  },
  {
    key: 'nivel',
    label: 'Nivel',
  },
  {
    key: 'categoria',
    label: 'Categoría',
    render: (proyecto) => proyecto.categoria?.nombre ?? '',
  },
  {
    key: 'destacado',
    label: 'Destacado',
    render: (proyecto) => (proyecto.destacado ? 'Sí' : 'No'),
  },
  // Si quieres ocultar alguna columna en móvil, añade hideOnMobile: true
];
