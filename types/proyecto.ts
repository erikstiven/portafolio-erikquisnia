import { z } from 'zod';

// frontend/types/proyecto.ts
export interface Categoria {
  id: number
  nombre: string
}

export const proyectoSchema = z.object({
  titulo: z.string().min(1, 'El título es obligatorio'),
  descripcion: z.string().min(1, 'La descripción es obligatoria'),
  tecnologias: z.string().min(1, 'Campo obligatorio'),
  imagenUrl: z.string().url('URL inválida'),
  demoUrl: z.string().url().optional().or(z.literal('')),
  githubUrl: z.string().url().optional().or(z.literal('')),
  destacado: z.boolean().optional(),
  categoriaId: z.number().optional().nullable(),
  nivel: z.enum(['Frontend', 'Backend', 'Fullstack']), // ← nuevo campo
});


export type ProyectoSchema = z.infer<typeof proyectoSchema>;

export interface Proyecto extends ProyectoSchema {
  id: number;
  createdAt: string;
  categoria?: {
    id: number;
    nombre: string;
  };
}
