// columns.tsx
'use client';

import type { ColumnaCrud } from '@/components/ui/TablaCrud';
import type { Categoria } from '@/types/categoria';

export const columnasCategoria: ColumnaCrud<Categoria>[] = [
  {
    key: 'nombre',
    label: 'Nombre',
  },
  {
    key: 'categoria',
    label: 'Categoría',
    render: (categoria) => categoria.nombre ?? '',
  },
];
