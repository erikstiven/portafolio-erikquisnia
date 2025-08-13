import { z } from 'zod';

export const proyectoSchema = z.object({
  id: z.number().optional(),
  titulo: z.string().min(1, 'El título es obligatorio'),
  descripcion: z.string().min(1, 'La descripción es obligatoria'),
  tecnologias: z.string().min(1, 'Las tecnologías son obligatorias'),
  categoriaId: z.number(),
  destacado: z.boolean(),
  nivel: z.enum(['Frontend', 'Backend', 'Fullstack']).nullable().optional(),
  imagenUrl: z.string().url().nullable().optional(),
  imagenPublicId: z.string().nullable().optional(),
  demoUrl: z.string().url().nullable().optional(),
  githubUrl: z.string().url().nullable().optional(),
});

export type Proyecto = z.infer<typeof proyectoSchema>;
export type ProyectoSchema = z.infer<typeof proyectoSchema>;
