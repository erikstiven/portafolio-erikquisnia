// components/admin/categorias/ModalCategorias.tsx

import React from 'react';
import FormCategorias from './FormCategoria';

interface ModalCategoriasProps {
  isOpen: boolean;
  onClose: () => void;
  categoria?: { id: number; nombre: string } | null;  // Aquí cambiamos `undefined` por `null`
}

const ModalCategorias: React.FC<ModalCategoriasProps> = ({ isOpen, onClose, categoria }) => {
  if (!isOpen) return null;

  return (
    <div>
      <div>
        <h2>{categoria ? 'Editar Categoría' : 'Crear Categoría'}</h2>
        <FormCategorias categoria={categoria} onClose={onClose} />
      </div>
      <button onClick={onClose}>Cerrar</button>
    </div>
  );
};

export default ModalCategorias;
