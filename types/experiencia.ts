import { z } from 'zod';

export const experienciaSchema = z.object({
  id: z.number().optional(),
  puesto: z.string().min(1, 'El puesto es obligatorio'),
  empresa: z.string().min(1, 'El nombre de la empresa es obligatorio'),
  descripcion: z.string().optional(),
  fechaInicio: z.string().min(1, 'La fecha de inicio es obligatoria'),
  fechaFin: z.string().optional(),
});

export type ExperienciaSchema = z.infer<typeof experienciaSchema>;

export interface Experiencia extends ExperienciaSchema {
  id: number;
  activo: boolean;
}
