import { z } from 'zod';

// Esquema de validación para experiencia
export const experienciaSchema = z.object({
  id: z.number().optional(),
  puesto: z.string().min(1, 'El puesto es obligatorio'),
  empresa: z.string().min(1, 'El nombre de la empresa es obligatorio'),
  descripcion: z.string().optional(),
  fechaInicio: z.string().min(1, 'La fecha de inicio es obligatoria'),
  fechaFin: z.string().optional(),
  actualmente: z.boolean(),  // Se agrega la propiedad `actualmente`
});

// Inferir el tipo de `ExperienciaSchema` a partir del esquema Zod
export type ExperienciaSchema = z.infer<typeof experienciaSchema>;

// El tipo final de `Experiencia` extiende `ExperienciaSchema` y agrega `activo` y `id`
export interface Experiencia extends ExperienciaSchema {
  id: number;
  activo: boolean;
}
