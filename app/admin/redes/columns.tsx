import { ColumnaCrud } from '@/components/ui/TablaCrud';
import { RedSocial } from '@/types/redSocial';
import { iconMap } from '@/utils/iconMap';

export const columnasRed: ColumnaCrud<RedSocial>[] = [
  {
    key: 'icono',
    label: 'Icono',
    render: (red) =>
      iconMap[red.icono] ? (
        <span className="text-3xl flex justify-center">{iconMap[red.icono]}</span>
      ) : (
        <span className="text-red-500 text-lg">❓</span>
      ),
    className: 'text-center w-20',
  },
  {
    key: 'nombre',
    label: 'Nombre',
    className: 'max-w-[200px] truncate',
  },
  {
    key: 'url',
    label: 'URL',
    render: (red) => (
      <a
        href={red.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-black underline transition block truncate"
      >
        {red.url}
      </a>
    ),
    className: 'max-w-[250px] truncate',
  },
];
