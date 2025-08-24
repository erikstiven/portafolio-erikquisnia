'use client';

import type { ColumnaCrud } from '@/components/ui/TablaCrud';
import type { Perfil } from '@/types/perfil';
import Image from 'next/image';

/** Columnas adaptadas a TablaCrud para perfiles */
export const columnasPerfil: ColumnaCrud<Perfil>[] = [
  {
    key: 'fotoHeroUrl',
    label: 'Foto',
    render: (p) =>
      p.fotoHeroUrl ? (
        <div className="relative w-12 h-12">
          <Image
            src={p.fotoHeroUrl}
            alt={p.nombreCompleto ?? 'Foto'}
            fill
            sizes="48px"                     // <-- agregado: evita la warning de Next.js
            className="object-cover rounded"
          />
        </div>
      ) : (
        <span className="text-gray-400 text-xs">Sin foto</span>
      ),
    className: 'w-14',
  },

  {
    key: 'nombreCompleto',
    label: 'Nombre',
    render: (p) => p.nombreCompleto ?? '—',
    className: 'max-w-[200px] truncate',
  },
  {
    key: 'telefono',
    label: 'Teléfono',
    render: (p) => p.telefono ?? '—',
    className: 'max-w-[160px] truncate',
  },
  {
    key: 'tituloHero',
    label: 'Título',
    render: (p) => p.tituloHero ?? '—',
    className: 'max-w-[160px] truncate',
  },
  {
    key: 'perfilTecnicoHero',
    label: 'Perfil técnico',
    render: (p) => p.perfilTecnicoHero ?? '—',
    className: 'max-w-[160px] truncate',
  },
];
