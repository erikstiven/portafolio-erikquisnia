// components/admin/categorias/columns.tsx
import { ColumnDef } from '@tanstack/react-table';
import { Categoria } from '@/types/categoria';

export const categoriasColumns: ColumnDef<Categoria>[] = [
  {
    header: 'ID',
    accessorKey: 'id',
  },
  {
    header: 'Nombre',
    accessorKey: 'nombre',
  },
];
