// /types/perfil.ts
import { z } from 'zod';

export interface Perfil {
  id: number;
  nombreCompleto: string;
  inicialesLogo: string;
  telefono: string;
  tituloHero: string;
  perfilTecnicoHero: string;
  descripcionHero: string;
  descripcionUnoSobreMi: string;
  descripcionDosSobreMi: string;

  // URLs persistidas en backend (Cloudinary o almacenamiento que uses)
  fotoHeroUrl: string | null;
  fotoSobreMiUrl: string | null;
  cvUrl: string | null;

  createdAt: string;
  updatedAt: string;
}

/** Formulario de texto (sin archivos). Los archivos se manejan fuera del schema. */
export const perfilSchema = z.object({
  nombreCompleto: z.string().min(1, 'Nombre completo es obligatorio'),
  inicialesLogo: z.string().min(1, 'Iniciales/logo es obligatorio'),
  telefono: z.string().min(1, 'Teléfono es obligatorio'),
  tituloHero: z.string().min(1, 'Título (Hero) es obligatorio'),
  perfilTecnicoHero: z.string().min(1, 'Perfil técnico (Hero) es obligatorio'),
  descripcionHero: z.string().min(1, 'Descripción (Hero) es obligatoria'),
  descripcionUnoSobreMi: z.string().min(1, 'Descripción 1 (Sobre mí) es obligatoria'),
  descripcionDosSobreMi: z.string().min(1, 'Descripción 2 (Sobre mí) es obligatoria'),
  fotoHeroUrl: z.string().url().nullable().optional(),
  fotoSobreMiUrl: z.string().url().nullable().optional(),
  cvUrl: z.string().url().nullable().optional(),
});
export type PerfilSchema = z.infer<typeof perfilSchema>;

/** Valores que maneja el formulario con archivos */
export type PerfilFormValues = PerfilSchema & {
  fotoHeroFile?: File | null;
  fotoSobreMiFile?: File | null;
  cvFile?: File | null;
};
