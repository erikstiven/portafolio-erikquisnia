'use client';

import { useDashboardData } from '@/hooks/useDashboardData';
import { FaShareAlt, FaFolderOpen, FaTags, FaUserAstronaut } from 'react-icons/fa';

const gradients = [
  'from-cyan-500 via-blue-500 to-indigo-600',
  'from-purple-500 via-fuchsia-500 to-pink-500',
  'from-yellow-400 via-orange-500 to-pink-600',
  'from-green-400 via-emerald-500 to-teal-500',
];

export default function AdminDashboard() {
  const { data } = useDashboardData();

  const cards = [
    {
      title: 'Redes Sociales',
      value: data?.redes ?? 0,
      icon: <FaShareAlt className="text-4xl text-white/90 drop-shadow" />,
    },
    {
      title: 'Proyectos',
      value: data?.proyectos ?? 0,
      icon: <FaFolderOpen className="text-4xl text-white/90 drop-shadow" />,
    },
    {
      title: 'Categorías',
      value: data?.categorias ?? 0,
      icon: <FaTags className="text-4xl text-white/90 drop-shadow" />,
    },
  ];

  return (
    <div className="relative p-4 sm:p-8 min-h-screen bg-gradient-to-tr from-slate-100 to-white">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-6 mt-2">
        <div className="flex items-center gap-4 mb-8">
          <span className="inline-block bg-gradient-to-br from-purple-500 to-blue-500 text-white rounded-xl p-4 shadow-xl">
            <FaUserAstronaut className="text-4xl" />
          </span>
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-800 drop-shadow-lg">
              Mi Dashboard Profesional
            </h1>
            <p className="text-base text-gray-500 mt-1">
              <span className="font-semibold text-blue-500">¡Bienvenido a tu espacio dinámico!</span> Gestiona tu carrera y logros.
            </p>
          </div>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto"> {/* Cambié lg:grid-cols-4 a lg:grid-cols-3 */}
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
            {/* Fondo animado */}
            <div
              className={`
                absolute inset-0 -z-10 blur-2xl opacity-50 transition-all duration-300 pointer-events-none
                group-hover:opacity-80 group-hover:blur-3xl
                bg-gradient-to-br ${gradients[idx % gradients.length]}
              `}
            />
            {/* Encabezado */}
            <div className="flex flex-row justify-between items-center">
              <h3 className="text-gray-900 font-bold text-lg">{card.title}</h3>
              {card.icon}
            </div>
            {/* Número grande alineado perfecto */}
            <div className="flex-1 flex items-end justify-end mt-3">
              <span className="text-5xl font-black text-gray-900 drop-shadow tracking-tighter leading-none select-none">
                {card.value}
              </span>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-10 text-sm text-right text-gray-400 max-w-7xl mx-auto">
        Última actualización: <span className="font-semibold text-blue-600">{new Date().toLocaleString()}</span>
      </p>
    </div>
  );
}
