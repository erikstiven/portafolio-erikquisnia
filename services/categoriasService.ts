// services/categoriasService.ts

import { CategoriaResponse } from '@/types/categoria';

const API_URL = '/api/categorias'; // Cambia la URL si es necesario

export const getCategorias = async (page: number = 1): Promise<CategoriaResponse> => {
  const response = await fetch(`${API_URL}?page=${page}`);
  if (!response.ok) {
    throw new Error('Error al obtener las categorías');
  }
  return response.json();
};

export const createCategoria = async (nombre: string) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ nombre }),
  });

  if (!response.ok) {
    throw new Error('Error al crear la categoría');
  }
  return response.json();
};

export const updateCategoria = async (id: number, nombre: string) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ nombre }),
  });

  if (!response.ok) {
    throw new Error('Error al actualizar la categoría');
  }
  return response.json();
};

export const deleteCategoria = async (id: number) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Error al eliminar la categoría');
  }
  return response.json();
};
