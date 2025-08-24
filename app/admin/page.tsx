'use client';

import { useDashboardData } from '@/hooks/useDashboardData';
import { FaShareAlt, FaFolderOpen, FaTags, FaUserAstronaut } from 'react-icons/fa';

const gradients = [
  'from-cyan-500 via-blue-500 to-indigo-600',
  'from-purple-500 via-fuchsia-500 to-pink-500',
  'from-yellow-400 via-orange-500 to-pink-600',
  'from-green-400 via-emerald-500 to-teal-500',
];

/**
 * Devuelve un número a partir de muchas formas posibles de payload:
 * - number
 * - array
 * - objeto con campos { data, items, rows, results }
 * - objeto con meta.total o meta.pagination.total
 * - objeto con count/total/total_count
 * - objeto singleton (contado como 1 si parece resource)
 */
function countValue(v: any): number {
  if (v == null) return 0;

  // Si ya es número o string numérico
  if (typeof v === 'number' && Number.isFinite(v)) return v;
  if (typeof v === 'string' && /^\d+$/.test(v)) return Number(v);

  // Array-like (incluye NodeList u otros objetos con length)
  if (Array.isArray(v)) return v.length;
  if (typeof v === 'object' && typeof (v as any).length === 'number' && !Array.isArray(v)) {
    // si tiene length y no es array, podría ser array-like
    const n = Number((v as any).length);
    if (!Number.isNaN(n)) return n;
  }

  // Si es objeto, intentar heurísticas
  if (typeof v === 'object') {
    // Campos directos comunes
    const maybeNumberFields = ['count', 'total', 'total_count', 'items_count', 'length', 'size'];
    for (const f of maybeNumberFields) {
      if (typeof (v as any)[f] === 'number') return (v as any)[f];
      if (typeof (v as any)[f] === 'string' && /^\d+$/.test((v as any)[f])) return Number((v as any)[f]);
    }

    // meta.total o meta.pagination.total
    if (v.meta && typeof v.meta.total === 'number') return v.meta.total;
    if (v.meta && v.meta.pagination && typeof v.meta.pagination.total === 'number') return v.meta.pagination.total;

    // Varios envoltorios típicos
    if (Array.isArray((v as any).data)) return (v as any).data.length;
    if ((v as any).data && Array.isArray((v as any).data?.items)) return (v as any).data.items.length;
    if ((v as any).data && typeof (v as any).data === 'object') {
      // data puede contener total/count
      if (typeof (v as any).data.total === 'number') return (v as any).data.total;
      if (typeof (v as any).data.count === 'number') return (v as any).data.count;
    }

    if (Array.isArray((v as any).items)) return (v as any).items.length;
    if (Array.isArray((v as any).results)) return (v as any).results.length;
    if (Array.isArray((v as any).rows)) return (v as any).rows.length;

    // Si el objeto tiene un id o parece un recurso -> contar como 1
    if ((v as any).id || (v as any).uuid || (v as any).slug) return 1;

    // Si es un objeto plano con keys, usar número de keys como fallback (útil para map-objects)
    try {
      const keys = Object.keys(v);
      if (keys.length) return keys.length;
    } catch {
      // ignore
    }
  }

  // último recurso
  return 0;
}

export default function AdminDashboard() {
  const { data } = useDashboardData();

  // Debug: imprime una línea clara en consola para ver la estructura real (solo en dev)
  if (typeof window !== 'undefined') {
    console.groupCollapsed('[Dashboard] debug');
    console.debug('raw data', data);
    console.debug('raw proyectos', data?.proyectos);
    console.debug('countValue(proyectos) =>', countValue(data?.proyectos));
    console.groupEnd();
  }

  const cards = [
    {
      title: 'Redes Sociales',
      value: countValue(data?.redes),
      icon: <FaShareAlt className="text-4xl text-white/90 drop-shadow" />,
    },
    {
      title: 'Proyectos',
      value: countValue(data?.proyectos),
      icon: <FaFolderOpen className="text-4xl text-white/90 drop-shadow" />,
    },
    {
      title: 'Categorías',
      value: countValue(data?.categorias),
      icon: <FaTags className="text-4xl text-white/90 drop-shadow" />,
    },
  ];

  return (
    <div className="relative p-4 sm:p-8 min-h-screen bg-gradient-to-t">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-6 mt-2">
        <div className="flex items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-800 drop-shadow-lg">
              Mi Dashboard Profesional
            </h1>
            <p className="text-base text-gray-900 mt-1">
              ¡Bienvenido a tu espacio dinámico! Gestiona tu carrera y logros.

            </p>
          </div>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {cards.map((card, idx) => (
          <div
            key={idx}
            className={`
              group relative backdrop-blur-xl bg-white/70 shadow-2xl rounded-3xl p-6 overflow-hidden flex flex-col
              border-2 border-transparent hover:border-blue-400 hover:scale-[1.035] transition-all duration-300
              min-h-[160px]
            `}
            style={{
              boxShadow: `0 8px 36px -10px rgba(80,100,200,0.13), 0 1.5px 14px 0 rgba(80,100,200,0.12)`,
            }}
          >
            <div
              className={`
                absolute inset-0 -z-10 blur-2xl opacity-50 transition-all duration-300 pointer-events-none
                group-hover:opacity-80 group-hover:blur-3xl
                bg-gradient-to-br ${gradients[idx % gradients.length]}
              `}
            />
            <div className="flex flex-row justify-between items-center">
              <h3 className="text-gray-900 font-bold text-lg">{card.title}</h3>
              {card.icon}
            </div>
            <div className="flex-1 flex items-end justify-end mt-3">
              <span className="text-5xl font-black text-gray-900 drop-shadow tracking-tighter leading-none select-none">
                {card.value}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
