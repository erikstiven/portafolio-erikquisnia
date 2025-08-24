import { z } from 'zod';

export interface Perfil {
  id?: number; // opcional, solo si el backend igual lo devuelve, pero no lo usamos en rutas
  nombreCompleto: string;
  inicialesLogo: string;
  telefono: string;
  tituloHero: string;
  perfilTecnicoHero: string;
  descripcionHero: string;
  descripcionUnoSobreMi: string;
  descripcionDosSobreMi: string;

  fotoHeroUrl: string | null;
  fotoSobreMiUrl: string | null;
  cvUrl: string | null;

  createdAt: string;
  updatedAt: string;
}


/** Texto plano (los archivos van fuera del schema) */
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

/** Valores que maneja el form (incluye archivos y flags de borrado) */
export type PerfilFormValues = PerfilSchema & {
  fotoHeroFile?: File | null;
  fotoSobreMiFile?: File | null;
  cvFile?: File | null;

  /** flags para borrar archivos existentes en el backend */
  removeAvatar?: boolean;
  removeFotoSobreMi?: boolean;
  removeCv?: boolean;
};
