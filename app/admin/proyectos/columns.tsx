'use client';

import type { ColumnaCrud } from '@/components/ui/TablaCrud';
import type { Proyecto } from '@/types/proyecto';
import Image from 'next/image';

/** Columnas adaptadas a TablaCrud para proyectos */
export const columnasProyecto: ColumnaCrud<Proyecto>[] = [
  {
    key: 'imagenUrl',
    label: 'Imagen',
    render: (p) =>
      p.imagenUrl ? (
        <div className="relative w-12 h-12">
          <Image
            src={p.imagenUrl}
            alt={p.titulo}
            fill
            className="object-cover rounded"
          />
        </div>
      ) : (
        <span className="text-gray-400 text-xs">Sin imagen</span>
      ),
  },
  {
    key: 'titulo',
    label: 'Título',
  },
  {
    key: 'nivel',
    label: 'Nivel',
    render: (p) => p.nivel ?? '—',
  },
  {
    key: 'categoriaId',
    label: 'Categoría',
    // Si tienes lista de categorías cargada aparte en el front, aquí se puede mejorar con lookup
    render: (p) => (p.categoria ? p.categoria.nombre : String(p.categoriaId ?? '—')),
  },
  {
    key: 'destacado',
    label: 'Destacado',
    render: (p) =>
      p.destacado ? (
        <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">
          Sí
        </span>
      ) : (
        <span className="px-2 py-1 bg-gray-200 text-gray-700 rounded text-xs">
          No
        </span>
      ),
  },
];
