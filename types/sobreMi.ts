import { z } from 'zod';

export const sobreMiSchema = z.object({
  id: z.number().optional(),
  descripcion: z.string().min(1, 'La descripción es obligatoria'),
});

export type SobreMiSchema = z.infer<typeof sobreMiSchema>;

export interface SobreMi extends SobreMiSchema {
  id: number;
  activo: boolean;
}
