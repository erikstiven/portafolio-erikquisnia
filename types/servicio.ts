import { z } from 'zod';

export const servicioSchema = z.object({
  id: z.number().optional(),
  nombre: z.string().min(1, 'El nombre es obligatorio'),
  descripcion: z.string().optional(),
  icono: z.string().optional(),
});

export type ServicioSchema = z.infer<typeof servicioSchema>;

export interface Servicio extends ServicioSchema {
  id: number;
  activo: boolean;
}
