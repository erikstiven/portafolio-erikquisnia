// app/admin/proyectos/columns.ts
import { ColumnaCrud } from '@/components/ui/TablaCrud';
import type { Proyecto } from '@/types/proyecto';
import { FaLink, FaGithub } from 'react-icons/fa';

const fmt = (iso?: string) => (iso ? new Date(iso).toLocaleDateString() : '—');

// type-guards para campos opcionales que pueden venir del backend
function hasCreatedAt(p: unknown): p is { createdAt?: string } {
  return typeof p === 'object' && p !== null && 'createdAt' in p;
}
function hasUpdatedAt(p: unknown): p is { updatedAt?: string } {
  return typeof p === 'object' && p !== null && 'updatedAt' in p;
}
function hasCategoria(p: unknown): p is { categoria?: { nombre?: string } | null } {
  return typeof p === 'object' && p !== null && 'categoria' in p;
}

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
  { key: 'titulo', label: 'Título', className: 'max-w-[180px] whitespace-normal break-words' },
  // { key: 'tecnologias', label: 'Tecnologías', className: 'max-w-[220px] whitespace-normal break-words' },

  {
    key: 'categoriaId',
    label: 'Categoría',
    render: (p) =>
      hasCategoria(p) && p.categoria?.nombre
        ? p.categoria.nombre
        : p.categoriaId
        ? String(p.categoriaId)
        : <span className="text-gray-400">Sin categoría</span>,
    className: 'whitespace-normal break-words',
  },

  // {
  //   key: 'nivel',
  //   label: 'Nivel',
  //   render: (p) => p.nivel ?? <span className="text-gray-400">—</span>,
  //   className: 'whitespace-normal',
  // },
  {
    key: 'destacado',
    label: 'Destacado',
    render: (p) =>
      p.destacado ? (
        <span className="px-2 py-0.5 text-xs rounded-full bg-yellow-500/15 text-yellow-700 border border-yellow-700/20">
          Sí
        </span>
      ) : (
        <span className="text-xs text-gray-400">No</span>
      ),
    className: 'text-center',
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
          aria-label={`Abrir demo de ${p.titulo}`}
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
          aria-label={`Abrir repositorio de ${p.titulo}`}
        >
          <FaGithub size={18} />
        </a>
      ) : (
        <span className="text-gray-400">—</span>
      ),
    className: 'text-center',
  },

];
