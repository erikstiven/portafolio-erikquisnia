// types/Categorias.ts

export interface Categoria {
  id: number;
  nombre: string;
}

export interface CategoriaResponse {
  items: Categoria[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}
