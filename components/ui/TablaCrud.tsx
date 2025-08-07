'use client';

import { Button } from '@/components/ui/button';

export interface ColumnaCrud<T> {
  key: keyof T | string;
  label: string;
  render?: (item: T) => React.ReactNode;
  className?: string;
  hideOnMobile?: boolean;
}

interface TablaCrudProps<T> {
  data: T[];
  columns: ColumnaCrud<T>[];
  onEdit?: (item: T) => void;
  onDelete?: (id: any) => void;
  getId: (item: T) => any;
}

export default function TablaCrud<T>({
  data,
  columns,
  onEdit,
  onDelete,
  getId,
}: TablaCrudProps<T>) {
  return (
    <div className="rounded-2xl shadow-xl border border-gray-200 w-full max-w-6xl mx-auto bg-gradient-to-br from-white via-slate-50 to-white overflow-hidden">
      {/* DESKTOP (tabla) */}
      <table className="min-w-full text-sm bg-transparent hidden md:table">
        <thead className="bg-gray-100/80 text-gray-700 rounded-t-xl">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key as string}
                className={`px-6 py-4 text-left font-semibold ${col.hideOnMobile ? 'hidden md:table-cell' : ''} ${col.className || ''}`}
              >
                {col.label}
              </th>
            ))}
            {(onEdit || onDelete) && (
              <th className="px-6 py-4 text-center font-semibold">Acciones</th>
            )}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length + 1} className="px-6 py-8 text-center text-gray-400 text-lg">
                No hay datos registrados
              </td>
            </tr>
          ) : (
            data.map((item) => (
              <tr
                key={getId(item)}
                className={`
                  even:bg-white odd:bg-gray-50 hover:bg-blue-50 hover:shadow transition-all duration-150
                  border-b last:border-b-0
                `}
              >
                {columns.map((col) => (
                  <td
                    key={col.key as string}
                    className={`px-6 py-4 align-middle ${col.hideOnMobile ? 'hidden md:table-cell' : ''} ${col.className || ''}`}
                  >
                    {col.render ? col.render(item) : (item as any)[col.key]}
                  </td>
                ))}
                {(onEdit || onDelete) && (
                  <td className="px-6 py-4 align-middle text-center">
                    <div className="flex flex-row gap-2 justify-center items-center w-full">
                      {onEdit && (
                        <Button
                          size="sm"
                          className="bg-black hover:bg-gray-800 text-white min-w-[110px] transition"
                          onClick={() => onEdit(item)}
                        >
                          Editar
                        </Button>
                      )}
                      {onDelete && (
                        <Button
                          size="sm"
                          variant="destructive"
                          className="min-w-[110px] transition"
                          onClick={() => onDelete(getId(item))}
                        >
                          Eliminar
                        </Button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* MOBILE (cards) */}
      <div className="flex flex-col gap-4 md:hidden p-2">
        {data.length === 0 ? (
          <div className="w-full py-10 text-center text-gray-400 text-base border rounded-lg bg-white">
            No hay datos registrados
          </div>
        ) : (
          data.map((item) => (
            <div
              key={getId(item)}
              className="bg-white rounded-xl shadow border p-4 flex flex-col gap-2"
            >
              {columns.map((col) => (
                <div key={col.key as string} className="flex items-start">
                  <span className="font-semibold w-32 text-gray-600">{col.label}:</span>
                  <div className="flex-1 break-words">{col.render ? col.render(item) : (item as any)[col.key]}</div>
                </div>
              ))}
              {(onEdit || onDelete) && (
                <div className="flex gap-2 mt-2">
                  {onEdit && (
                    <Button
                      size="sm"
                      className="bg-black hover:bg-gray-800 text-white flex-1 min-w-[80px]"
                      onClick={() => onEdit(item)}
                    >
                      Editar
                    </Button>
                  )}
                  {onDelete && (
                    <Button
                      size="sm"
                      variant="destructive"
                      className="flex-1 min-w-[80px]"
                      onClick={() => onDelete(getId(item))}
                    >
                      Eliminar
                    </Button>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
