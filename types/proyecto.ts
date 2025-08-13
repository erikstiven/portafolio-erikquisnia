import { z } from 'zod';

export const NIVEL_VALUES = ['Frontend','Backend','Fullstack'] as const;
export type Nivel = (typeof NIVEL_VALUES)[number];

export const proyectoSchema = z.object({
  id: z.number().optional(),
  titulo: z.string().min(1, 'El título es obligatorio'),
  descripcion: z.string().min(1, 'La descripción es obligatoria'),
  tecnologias: z.string().min(1, 'Las tecnologías son obligatorias'),
  categoriaId: z.number().nullable(),        // puede no seleccionarse
  destacado: z.boolean(),
  nivel: z.enum(NIVEL_VALUES).nullable(),    // Frontend, Backend o Fullstack
  imagenUrl: z.string().url().nullable(),
  demoUrl: z.string().url().nullable(),
  githubUrl: z.string().url().nullable(),
});

export type ProyectoSchema = z.infer<typeof proyectoSchema>;

export interface Proyecto extends ProyectoSchema {
  id: number;
  activo: boolean;
}
