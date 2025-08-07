'use client';

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Redes', value: 3 },
  { name: 'Proyectos', value: 0 },
  { name: 'Servicios', value: 0 },
  { name: 'Categorías', value: 0 },
];

export default function DashboardChart() {
  return (
    <div className="w-full h-64 bg-white rounded-xl shadow p-4 mt-6">
      <h3 className="text-lg font-semibold mb-2">Actividad del sistema</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="value" fill="#0ea5e9" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
