import { z } from 'zod';

export const categoriaSchema = z.object({
  id: z.number().optional(), // Solo para editar
  nombre: z.string().min(1, 'El nombre es obligatorio'),
  descripcion: z.string().optional(),
});

export type CategoriaSchema = z.infer<typeof categoriaSchema>;

export interface Categoria extends CategoriaSchema {
  id: number;
  activo: boolean;
}
