import { z } from 'zod';

// Validación con Zod: asegura que lo que envías al backend tenga el formato correcto
export const experienciaSchema = z.object({
  id: z.number().optional(),
  puesto: z.string().min(1, 'El puesto es obligatorio'),
  empresa: z.string().min(1, 'La empresa es obligatoria'),
  descripcion: z.string().optional(),
  fechaInicio: z.string().min(1, 'La fecha de inicio es obligatoria'),
  fechaFin: z.string().optional(),
  actualmente: z.boolean(),
});

export type ExperienciaSchema = z.infer<typeof experienciaSchema>;

// Tipo que representa una experiencia completa traída desde la API
export interface Experiencia extends ExperienciaSchema {
  id: number;
  activo: boolean; // tu API lo usa para soft-delete o visibilidad
}
