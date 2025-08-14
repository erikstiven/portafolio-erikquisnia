// components/admin/categorias/page.tsx
'use client'; // Esto marca este archivo como un Componente de Cliente

import React, { useState } from 'react';
import { useCategorias } from '../../../hooks/useCategorias';
import TablaCategorias from './TablaCategorias';
import ModalCategorias from './ModalCategoria';

const CategoriasPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<{ id: number; nombre: string } | null>(null);

  const { categorias, loading, error, fetchCategorias } = useCategorias();

  const abrirModal = (categoria?: { id: number; nombre: string }) => {
    setCategoriaSeleccionada(categoria || null);  // Sigue pasando `null` si no hay categoría seleccionada
    setIsModalOpen(true);
  };

  const cerrarModal = () => {
    setIsModalOpen(false);
    fetchCategorias();
  };

  return (
    <div>
      <h1>Categorías</h1>
      <button onClick={() => abrirModal()}>Crear Categoría</button>
      {loading ? <p>Cargando...</p> : <TablaCategorias categorias={categorias} />}
      <ModalCategorias isOpen={isModalOpen} onClose={cerrarModal} categoria={categoriaSeleccionada} />
    </div>
  );
};

export default CategoriasPage;
