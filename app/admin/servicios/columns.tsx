import { ColumnaCrud } from '@/components/ui/TablaCrud';
import { Servicio } from '@/types/servicio';

export const columnasServicio: ColumnaCrud<Servicio>[] = [
  { key: 'nombre', label: 'Nombre' },
  {
    key: 'descripcion',
    label: 'Descripción',
    render: (s) => <span className="line-clamp-2">{s.descripcion}</span>,
    className: "max-w-xs"
  },
  {
    key: 'precio',
    label: 'Precio',
    render: (s) =>
      s.precio != null
        ? <>${s.precio.toFixed(2)}</>
        : <span className="text-gray-400">-</span>,
    className: "text-right"
  }
];
