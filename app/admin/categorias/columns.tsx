'use client';

import type { ColumnaCrud } from '@/components/ui/TablaCrud';
import type { Categoria } from '@/types/categoria';

/** Columnas adaptadas a TablaCrud */
export const columnasCategoria: ColumnaCrud<Categoria>[] = [
  {
    key: 'nombre',
    label: 'Nombre',
  },
];
