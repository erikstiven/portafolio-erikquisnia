import { ColumnaCrud } from '@/components/ui/TablaCrud';
import { Categoria } from '@/types/categoria';

export const columnasCategoria: ColumnaCrud<Categoria>[] = [
  { key: 'nombre', label: 'Nombre' },
];
