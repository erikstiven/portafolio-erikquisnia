// components/admin/categorias/TablaCategorias.tsx
'use client';

import React, { useState } from 'react'; // Asegúrate de importar useState y useEffect
import TablaCrud from '@/components/ui/TablaCrud';
import type { Categoria } from '@/types/categoria';
import { columnasCategoria } from './columns';

interface Props {
  categorias: Categoria[];
  loading: boolean;
  onEdit: (categoria: Categoria) => void;
  onDelete: (id: number) => void;
}

export default function TablaCategorias({
  categorias,
  loading,
  onEdit,
  onDelete,
}: Props) {
  const [page, setPage] = useState(1); // Estado para la página actual
  const [pageSize, setPageSize] = useState(10); // Estado para el tamaño de la página
  const [total, setTotal] = useState(0); // Estado para el total de categorías

  // Función para manejar el cambio de página
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    // Aquí puedes hacer la lógica de obtener las categorías por página
  };

  // Función para manejar el cambio del tamaño de la página
  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    // Aquí puedes ajustar la lógica para el tamaño de la página
  };

  return (
    <TablaCrud
      data={categorias}
      columns={columnasCategoria}
      onEdit={onEdit}
      onDelete={onDelete}
      getId={(categoria) => categoria.id}
      loading={loading}
      page={page}
      pageSize={pageSize}
      total={total}
      onPageChange={handlePageChange} // Paginación
      onPageSizeChange={handlePageSizeChange} // Cambio de tamaño de la página
    />
  );
}
