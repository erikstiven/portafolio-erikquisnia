import { z } from 'zod';

/** Valores posibles para el nivel */
export const NIVEL_VALUES = ['Backend', 'Fullstack', 'Frontend'] as const;
export type Nivel = typeof NIVEL_VALUES[number];

/** Objeto devuelto por tu API (formateado a camelCase en el front) */
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

  createdAt: string | null;
  updatedAt: string | null;
}

/** Esquema de validación para formularios */
export const proyectoSchema = z.object({
  titulo: z.string().min(1, 'El título es obligatorio'),
  descripcion: z.string().min(1, 'La descripción es obligatoria'),
  tecnologias: z.string().min(1, 'Las tecnologías son obligatorias'),

  // 👇 Acepta null pero validamos que no quede vacío al guardar
  categoriaId: z
    .number()
    .int()
    .nullable()
    .refine((val) => val !== null, { message: 'La categoría es obligatoria' }),

  destacado: z.boolean(),

  // 👇 Nivel puede ser uno de los valores o null
  nivel: z.enum(NIVEL_VALUES).nullable().optional(),

  // Campos opcionales relacionados con imagen/urls
  imagenUrl: z.string().url().nullable().optional(),
  imagenPublicId: z.string().nullable().optional(),
  demoUrl: z.string().url().nullable().optional(),
  githubUrl: z.string().url().nullable().optional(),
});

/** Tipo inferido a partir del esquema */
export type ProyectoSchema = z.infer<typeof proyectoSchema>;
