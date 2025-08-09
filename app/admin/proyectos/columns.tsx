import { ColumnaCrud } from '@/components/ui/TablaCrud';
import { Proyecto } from '@/types/proyecto';
import { FaLink, FaGithub } from 'react-icons/fa';

export const columnasProyecto: ColumnaCrud<Proyecto>[] = [
  {
    key: 'imagenUrl',
    label: 'Imagen',
    render: (p) =>
      p.imagenUrl ? (
        <img
          src={p.imagenUrl}
          alt={p.titulo}
          className="w-14 h-12 md:w-20 md:h-14 object-cover rounded border shadow"
        />
      ) : (
        <span className="text-gray-400">Sin imagen</span>
      ),
    className: 'align-middle',
  },
  { key: 'titulo', label: 'Título',
    className: 'max-w-[180px] whitespace-normal break-all',

   },
  {
    key: 'tecnologias',
    label: 'Tecnologías',
    className: 'max-w-[180px] whitespace-normal break-all',
  },
  {
    key: 'categoria',
    label: 'Categoría',
    render: (p) => p.categoria?.nombre || <span className="text-gray-400">Sin categoría</span>,
    className: 'whitespace-normal break-words',
  },
  {
    key: 'demoUrl',
    label: 'Demo',
    render: (p) =>
      p.demoUrl ? (
        <a
          href={p.demoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block p-1 rounded hover:bg-blue-100 transition text-blue-600"
          aria-label="Ver demo"
        >
          <FaLink size={18} />
        </a>
      ) : (
        <span className="text-gray-400">—</span>
      ),
    className: 'text-center',
  },
  {
    key: 'githubUrl',
    label: 'GitHub',
    render: (p) =>
      p.githubUrl ? (
        <a
          href={p.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block p-1 rounded hover:bg-gray-200 transition text-gray-800"
          aria-label="Ver código"
        >
          <FaGithub size={18} />
        </a>
      ) : (
        <span className="text-gray-400">—</span>
      ),
    className: 'text-center',
  },
  /*{
    key: 'destacado',
    label: 'Destacado',
    render: (p) =>
      p.destacado ? (
        <span className="inline-block text-green-600 text-lg">★</span>
      ) : (
        <span className="inline-block text-gray-300 text-lg">—</span>
      ),
    className: 'text-center',
  },
  {
    key: 'nivel',
    label: 'Nivel',
    className: 'whitespace-normal',
  },*/
];
