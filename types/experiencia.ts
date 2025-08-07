import { z } from 'zod';

export const experienciaSchema = z.object({
  puesto: z.string().min(1, 'El puesto es obligatorio'),
  empresa: z.string().min(1, 'La empresa es obligatoria'),
  fechaInicio: z.string().min(4, 'Fecha de inicio requerida'),
  fechaFin: z.string().nullable().optional(),
  actualmente: z.boolean().optional(),  // <-- ¡Nombre correcto!
  descripcion: z.string().min(1, 'La descripción es obligatoria'),
});

export type ExperienciaSchema = z.infer<typeof experienciaSchema>;

export interface Experiencia extends ExperienciaSchema {
  id: number;
  createdAt: string;
  updatedAt: string;
}
