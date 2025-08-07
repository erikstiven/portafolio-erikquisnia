'use client';

import { useDashboardData } from '@/hooks/useDashboardData';
import { FaShareAlt, FaFolder, FaWrench, FaTags } from 'react-icons/fa';
// import DashboardChart from '@/components/ui/DashboardChart'; // Si usas gráfico

export default function AdminDashboard() {
  const { data, loading } = useDashboardData();

  const cards = [
    {
      title: 'Redes Sociales',
      value: data?.redes ?? 0,
      icon: <FaShareAlt className="text-4xl text-white/80 drop-shadow" />,
    },
    {
      title: 'Proyectos',
      value: data?.proyectos ?? 0,
      icon: <FaFolder className="text-4xl text-white/80 drop-shadow" />,
    },
    {
      title: 'Servicios',
      value: data?.servicios ?? 0,
      icon: <FaWrench className="text-4xl text-white/80 drop-shadow" />,
    },
    {
      title: 'Categorías',
      value: data?.categorias ?? 0,
      icon: <FaTags className="text-4xl text-white/80 drop-shadow" />,
    },
  ];

  return (
    <div className="p-4 sm:p-6 min-h-screen bg-white">
      <h1 className="text-2xl sm:text-3xl font-bold mb-2 text-gray-800">Resumen del sistema</h1>
      <p className="text-xs sm:text-sm text-gray-500 mb-8">
        Última actualización: {new Date().toLocaleString()}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {cards.map((card, idx) => (
          <div
            key={idx}
            className="
              bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600
              p-5 sm:p-6 rounded-2xl shadow-xl
              hover:scale-105 hover:shadow-2xl transition-all duration-300 cursor-pointer
              flex flex-col gap-2 min-h-[112px] sm:min-h-[128px]
            "
          >
            <div className="flex justify-between items-center">
              <h3 className="text-white font-semibold text-base sm:text-lg drop-shadow">{card.title}</h3>
              {card.icon}
            </div>
            <div className="text-3xl sm:text-4xl font-bold text-white drop-shadow mt-2">{card.value}</div>
          </div>
        ))}
      </div>

      {/* <DashboardChart /> */}
    </div>
  );
}
