import { z } from 'zod';

export const redSocialSchema = z.object({
  id: z.number().optional(), // Solo para editar
  nombre: z.string().min(1, 'El nombre es obligatorio'),
  url: z.string().url('URL inválida'),
  icono: z.string().min(1, 'Selecciona un icono'),
});

export type RedSocialSchema = z.infer<typeof redSocialSchema>;

export interface RedSocial extends RedSocialSchema {
  id: number;
  activo: boolean;
}
