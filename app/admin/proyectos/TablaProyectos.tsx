'use client';

import { Proyecto } from '@/types/proyecto';
import { Button } from '@/components/ui/button';

interface Props {
  proyectos: Proyecto[];
  onEdit: (proyecto: Proyecto) => void;
  onDelete: (id: number) => void;
}

export default function TablaProyectos({ proyectos, onEdit, onDelete }: Props) {
  return (
    <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-200 w-full max-w-6xl mx-auto">
      <table className="min-w-full text-sm bg-white">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="px-2 md:px-4 py-3 text-left">Imagen</th>
            <th className="px-2 md:px-4 py-3 text-left">Título</th>
            <th className="px-2 md:px-4 py-3 text-left hidden md:table-cell">Tecnologías</th>
            <th className="px-2 md:px-4 py-3 text-left hidden md:table-cell">Categoría</th>
            <th className="px-2 md:px-4 py-3 text-center hidden md:table-cell">Destacado</th>
            <th className="px-2 md:px-4 py-3 text-left hidden md:table-cell">Nivel</th>
            <th className="px-2 md:px-4 py-3 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {proyectos.map((proyecto, index) => (
            <tr
              key={proyecto.id}
              className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50 hover:bg-gray-100'}
            >
              <td className="px-2 md:px-6 py-3">
                <img
                  src={proyecto.imagenUrl}
                  alt={proyecto.titulo}
                  className="w-14 h-14 md:w-20 md:h-20 object-cover rounded"
                />
              </td>
              <td className="px-2 md:px-6 py-3 font-medium text-gray-800">
                {proyecto.titulo}
              </td>
              <td className="px-2 md:px-6 py-3 text-gray-700 hidden md:table-cell">{proyecto.tecnologias}</td>
              <td className="px-2 md:px-6 py-3 text-gray-700 hidden md:table-cell">
                {proyecto.categoria?.nombre || 'Sin categoría'}
              </td>
              <td className="px-2 md:px-6 py-3 text-center text-gray-700 hidden md:table-cell">
                {proyecto.destacado ? '✅' : '—'}
              </td>
              <td className="px-2 md:px-6 py-3 text-gray-700 hidden md:table-cell">
                {proyecto.nivel}
              </td>
              <td className="px-2 md:px-6 py-3">
                <div className="flex justify-center gap-2 flex-wrap">
                  <Button
                    size="sm"
                    className="bg-black hover:bg-gray-800 text-white"
                    onClick={() => onEdit(proyecto)}
                  >
                    Editar
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => onDelete(proyecto.id)}
                  >
                    Eliminar
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* En móvil, ya puedes hacer scroll horizontal si hay muchas columnas */}
    </div>
  );
}
