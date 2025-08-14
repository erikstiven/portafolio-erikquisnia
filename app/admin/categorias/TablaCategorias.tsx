// components/admin/categorias/TablaCategorias.tsx
import React from 'react';
import { useReactTable, flexRender } from '@tanstack/react-table';
import { categoriasColumns } from './columns';
import { Categoria } from '@/types/categoria';

interface TablaCategoriasProps {
  categorias: Categoria[];
}

const TablaCategorias: React.FC<TablaCategoriasProps> = ({ categorias }) => {
  const table = useReactTable({
    data: categorias,
    columns: categoriasColumns,
    getCoreRowModel: () => ({
      rows: categorias.map((categoria) => ({
        id: categoria.id.toString(),
        cells: [
          { columnId: 'id', value: categoria.id },
          { columnId: 'nombre', value: categoria.nombre },
        ],
      })),
    }),
  });

  return (
    <table>
      <thead>
        {table.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map(header => (
              <th key={header.id}>
                {flexRender(header.column.columnDef.header, header.getContext())}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map(row => (
          <tr key={row.id}>
            {row.getVisibleCells().map(cell => (
              <td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TablaCategorias;
