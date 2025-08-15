// /app/(panel)/perfil/columns.tsx
'use client';

import type { ColumnaCrud } from '@/components/ui/TablaCrud';
import type { Perfil } from '@/types/perfil';

/** Columnas para TablaCrud (mismo patrón que proyectos) */
export const columnasPerfil: ColumnaCrud<Perfil>[] = [
  { key: 'nombreCompleto', label: 'Nombre' },
  { key: 'telefono', label: 'Teléfono' },
  { key: 'tituloHero', label: 'Título (Hero)' },
];
