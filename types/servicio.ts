import { z } from 'zod';

export const servicioSchema = z.object({
  nombre: z.string().min(1, 'El nombre es obligatorio'),
  descripcion: z.string().min(1, 'La descripción es obligatoria'),
  precio: z.number().nullable().optional(),
});

export type ServicioSchema = z.infer<typeof servicioSchema>;

export interface Servicio extends ServicioSchema {
  id: number;
}
