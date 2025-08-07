import { z } from 'zod';

// Esquema de validación con Zod
export const categoriaSchema = z.object({
  nombre: z.string().min(1, 'El nombre es obligatorio'),
});

// Tipo inferido desde el esquema
export type CategoriaSchema = z.infer<typeof categoriaSchema>;

// Tipo extendido completo (usado para listar con ID y createdAt si lo tuvieras)
export interface Categoria extends CategoriaSchema {
  id: number;
}
