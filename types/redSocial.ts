import { z } from 'zod';

// Esquema de validación con Zod
export const redSocialSchema = z.object({
  id: z.number().optional(),              // Solo se usa al editar
  nombre: z.string().min(1, 'El nombre es obligatorio'),
  url: z.string().url('La URL no es válida'),
  icono: z.string().min(1, 'Selecciona un icono'),
});

// Tipo para formularios / validación
export type RedSocialSchema = z.infer<typeof redSocialSchema>;

// Tipo completo que devuelve el backend
export interface RedSocial extends RedSocialSchema {
  id: number;     // garantizado por la BD
  activo: boolean; // control de soft-delete o visibilidad
}
