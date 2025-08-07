'use client';

import { RedSocial } from '@/types/redSocial';
import { iconMap } from '@/utils/iconMap';
import { Button } from '@/components/ui/button';

interface Props {
  redes: RedSocial[];
  onEdit: (red: RedSocial) => void;
  onDelete: (id: number) => void;
}

export default function TablaRedes({ redes, onEdit, onDelete }: Props) {
  return (
    <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-200 w-full max-w-6xl mx-auto">
      <table className="min-w-full text-sm bg-white">
        <thead className="bg-gray-100 text-gray-700 md:table-header-group hidden">
          <tr>
            <th className="px-6 py-3 text-left">Icono</th>
            <th className="px-6 py-3 text-left">Nombre</th>
            <th className="px-6 py-3 text-left">URL</th>
            <th className="px-6 py-3 text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {redes.map((red, index) => (
            <tr
              key={red.id}
              className={`
                even:bg-white odd:bg-gray-50 hover:bg-blue-50 
                border-b last:border-b-0
                md:table-row flex flex-col md:flex-row mb-4 md:mb-0 rounded-xl md:rounded-none shadow-md md:shadow-none
                transition
              `}
            >
              {/* Icono */}
              <td className="px-6 py-4 text-3xl text-center flex items-center justify-center md:table-cell">
                <span className="md:hidden font-semibold w-24">Icono:</span>
                {iconMap[red.icono] ?? <span className="text-red-500">❓</span>}
              </td>
              {/* Nombre */}
              <td className="px-6 py-4 font-medium text-gray-800 flex items-center md:table-cell">
                <span className="md:hidden font-semibold w-24">Nombre:</span>
                {red.nombre}
              </td>
              {/* URL */}
              <td className="px-6 py-4 text-blue-600 underline break-all flex items-center md:table-cell">
                <span className="md:hidden font-semibold w-24">URL:</span>
                <a href={red.url} target="_blank" rel="noopener noreferrer" className="hover:text-blue-800 transition">{red.url}</a>
              </td>
              {/* Acciones */}
              <td className="px-6 py-4 flex gap-2 md:space-x-2 md:flex-row flex-col md:table-cell">
                <span className="md:hidden font-semibold w-24">Acciones:</span>
                <Button
                  size="sm"
                  className="bg-black hover:bg-gray-800 text-white focus-visible:ring-2 focus-visible:ring-blue-500"
                  onClick={() => onEdit(red)}
                >
                  Editar
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  className="focus-visible:ring-2 focus-visible:ring-red-500"
                  onClick={() => onDelete(red.id)}
                >
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {redes.length === 0 && (
        <div className="text-center text-gray-500 py-10">No hay redes sociales registradas.</div>
      )}
    </div>
  );
}
