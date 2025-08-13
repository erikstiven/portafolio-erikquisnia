import { z } from 'zod';

/** Valores posibles para el nivel (ajusta según tu dominio) */
export const NIVEL_VALUES = ['Backend', 'Fullstack', 'Frontend'] as const;
export type Nivel = typeof NIVEL_VALUES[number];

/** Objeto devuelto por tu API */
export interface Proyecto {
  id: number;
  titulo: string;
  descripcion: string;
  tecnologias: string;
  imagenUrl: string | null;
  imagenPublicId: string | null;
  demoUrl: string | null;
  githubUrl: string | null;
  destacado: boolean;
  nivel: Nivel | null;
  categoriaId: number | null;
  categoria?: { id: number; nombre: string };
  createdAt: string;
  updatedAt: string;
}

/** Esquema de validación para el formulario */
export const proyectoSchema = z.object({
  titulo: z.string().min(1, 'El título es obligatorio'),
  descripcion: z.string().min(1, 'La descripción es obligatoria'),
  tecnologias: z.string().min(1, 'Tecnologías es obligatorio'),
  categoriaId: z.number().nullable(),
  destacado: z.boolean(),
  nivel: z.enum(NIVEL_VALUES).nullable(),
  imagenUrl: z.string().url().nullable(),
  demoUrl: z.string().url().nullable(),
  githubUrl: z.string().url().nullable(),
});
export type ProyectoSchema = z.infer<typeof proyectoSchema>;
