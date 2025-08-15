'use client';

import { useEffect, useState } from 'react';
import { getProyectos, deleteProyecto } from '@/services/proyectoService';
import { columnasProyecto } from './columns';
import TablaCrud from '@/components/ui/TablaCrud'; // Asegúrate de que TablaCrud esté correctamente importado
import { Proyecto } from '@/types/proyecto';

interface PageProyectosProps {
  // Propiedades esperadas para la tabla
  proyectos: Proyecto[];
  loading: boolean;
  onEdit: (proyecto: Proyecto) => void;
  onDelete: (id: number) => Promise<void>;
}

const TablaProyectos = ({ proyectos, loading, onEdit, onDelete }: PageProyectosProps) => {
  const [page, setPage] = useState(0); // Página actual
  const [pageSize, setPageSize] = useState(10); // Tamaño de página (items por página)
  const [total, setTotal] = useState(0); // Total de elementos

  // Función para obtener el id
  const getId = (proyecto: Proyecto) => proyecto.id;

  // Funciones para manejar la paginación
  const onPageChange = (newPage: number) => setPage(newPage);
  const onPageSizeChange = (newPageSize: number) => setPageSize(newPageSize);

  return (
    <div>
      <TablaCrud
        columns={columnasProyecto} // Asegúrate de que las columnas estén correctamente definidas
        data={proyectos} // Los datos de los proyectos
        getId={getId} // Obtener el ID de cada proyecto
        page={page} // Página actual
        pageSize={pageSize} // Tamaño de la página
        total={total} // Total de proyectos
        onPageChange={onPageChange} // Manejar el cambio de página
        onPageSizeChange={onPageSizeChange} // Manejar el cambio de tamaño de página
        loading={loading} // Indicar que está cargando
        onEdit={onEdit} // Función de edición
        onDelete={onDelete} // Función de eliminación
      />
    </div>
  );
};

export default TablaProyectos;
