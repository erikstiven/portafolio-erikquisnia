import { z } from 'zod';

// Definir el esquema de validación con zod
export const categoriaSchema = z.object({
  nombre: z.string().min(1, 'El nombre es obligatorio'),
});

// Definir el tipo de datos para la categoría
export type CategoriaSchema = z.infer<typeof categoriaSchema>;

// El tipo Categoria ya debe estar definido en tu archivo y exportado
export interface Categoria {
  id: number;
  nombre: string;
}
