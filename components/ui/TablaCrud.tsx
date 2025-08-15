import React from 'react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

// Tipos para las columnas
export interface ColumnaCrud<T> {
  key: keyof T | string;
  label: string;
  render?: (item: T) => React.ReactNode;
  className?: string;
  hideOnMobile?: boolean; // si true, se oculta en móvil
}

// Tipos para las propiedades de TablaCrud
interface TablaCrudProps<T> {
  data: T[];
  columns: ColumnaCrud<T>[];
  onEdit?: (item: T) => void;
  onDelete?: (id: any) => void;
  getId: (item: T) => any;
  loading?: boolean;
  skeletonRows?: number;
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
}

export default function TablaCrud<T>({
  data,
  columns,
  onEdit,
  onDelete,
  getId,
  loading = false,
  skeletonRows = 6,
  page,
  pageSize,
  total,
  onPageChange,
  onPageSizeChange,
}: TablaCrudProps<T>) {
  const rows = Array.isArray(data) ? data : [];
  const hasActions = Boolean(onEdit || onDelete);
  const colCount = columns.length + (hasActions ? 1 : 0);

  // Columnas a mostrar en móvil (si no hay ninguna visible, usa la primera como fallback)
  const mobileColumnsBase = columns.filter((c) => !c.hideOnMobile);
  const mobileColumns = mobileColumnsBase.length > 0 ? mobileColumnsBase : columns.slice(0, 1);

  return (
    <div className="rounded-2xl shadow-xl border border-gray-200 w-full max-w-6xl mx-auto bg-gradient-to-br from-white via-slate-50 to-white overflow-hidden">

      {/* =================== DESKTOP (md+) - TABLA =================== */}
      <table className="min-w-full table-auto text-sm bg-transparent hidden md:table">
        <thead className="bg-gray-100/80 text-gray-700">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key as string}
                className={`px-6 py-4 text-left font-semibold ${col.hideOnMobile ? 'hidden md:table-cell' : ''}`}
              >
                {col.label}
              </th>
            ))}
            {hasActions && <th className="px-6 py-4 text-center font-semibold">Acciones</th>}
          </tr>
        </thead>

        <tbody aria-busy={loading}>
          {loading ? (
            Array.from({ length: skeletonRows }).map((_, i) => (
              <tr key={`sk-${i}`} className="border-b last:border-b-0">
                {columns.map((col) => (
                  <td key={`${i}-${col.key as string}`} className={`px-4 py-4 ${col.hideOnMobile ? 'hidden md:table-cell' : ''}`}>
                    <Skeleton className="h-5 w-full" />
                  </td>
                ))}
                {hasActions && (
                  <td className="px-6 py-4 text-center">
                    <div className="flex gap-2 justify-center">
                      <Skeleton className="h-8 w-20" />
                      <Skeleton className="h-8 w-20" />
                    </div>
                  </td>
                )}
              </tr>
            ))
          ) : rows.length === 0 ? (
            <tr>
              <td colSpan={colCount} className="px-6 py-8 text-center text-gray-400 text-lg whitespace-normal break-words">
                No hay datos registrados
              </td>
            </tr>
          ) : (
            rows.map((item) => (
              <tr
                key={getId(item)}
                className="even:bg-white odd:bg-gray-50 hover:bg-blue-50 hover:shadow transition-all duration-150 border-b last:border-b-0"
              >
                {columns.map((col) => (
                  <td
                    key={col.key as string}
                    className={`px-4 py-4 align-middle whitespace-normal break-words ${col.hideOnMobile ? 'hidden md:table-cell' : ''} ${col.className ?? ''}`}
                  >
                    {col.render ? col.render(item) : (item as any)[col.key]}
                  </td>
                ))}
                {hasActions && (
                  <td className="px-6 py-4 align-middle text-center">
                    <div className="flex flex-row gap-2 justify-center items-center w-full">
                      {onEdit && (
                        <Button
                          size="sm"
                          className="bg-black hover:bg-gray-800 text-white min-w-[110px] transition"
                          onClick={() => onEdit(item)}
                          disabled={loading}
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
                          disabled={loading}
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

      {/* =================== MÓVIL (<md) - LISTA/CARDS =================== */}
      <div className="md:hidden">
        {loading ? (
          <ul className="divide-y divide-gray-200">
            {Array.from({ length: skeletonRows }).map((_, i) => (
              <li key={`msk-${i}`} className="p-4">
                <div className="space-y-2">
                  {mobileColumns.map((_, idx) => (
                    <Skeleton key={idx} className="h-4 w-3/4" />
                  ))}
                </div>
                {hasActions && (
                  <div className="mt-3 flex gap-2">
                    <Skeleton className="h-8 w-full" />
                    {onDelete && <Skeleton className="h-8 w-full" />}
                  </div>
                )}
              </li>
            ))}
          </ul>
        ) : rows.length === 0 ? (
          <div className="px-4 py-8 text-center text-gray-400 text-base">
            No hay datos registrados
          </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {rows.map((item) => (
              <li key={getId(item)} className="p-4 bg-white">
                <div className="space-y-2">
                  {mobileColumns.map((col) => (
                    <div key={col.key as string} className="flex items-start gap-2">
                      <span className="text-xs text-gray-500 w-28 shrink-0">{col.label}</span>
                      <div className={`text-sm text-gray-900 break-words flex-1 ${col.className ?? ''}`}>
                        {col.render ? col.render(item) : (item as any)[col.key]}
                      </div>
                    </div>
                  ))}
                </div>

                {hasActions && (
                  <div className="mt-3 flex gap-2">
                    {onEdit && (
                      <Button
                        size="sm"
                        className="flex-1 bg-black hover:bg-gray-800 text-white"
                        onClick={() => onEdit(item)}
                        disabled={loading}
                      >
                        Editar
                      </Button>
                    )}
                    {onDelete && (
                      <Button
                        size="sm"
                        variant="destructive"
                        className="flex-1"
                        onClick={() => onDelete(getId(item))}
                        disabled={loading}
                      >
                        Eliminar
                      </Button>
                    )}
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
