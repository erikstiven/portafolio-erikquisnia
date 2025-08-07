'use client'; // Este archivo se ejecuta solo del lado del cliente (usa useEffect, window, etc.)

import { useEffect, useState } from 'react';
import api from '@/lib/api'         ; // Importamos la instancia de Axios con configuración baseURL y token

// Tipo de datos que representa el resumen del dashboard
interface DashboardData {
  redes: number;
  proyectos: number;
  servicios: number;
  categorias: number;
}

// Hook personalizado que carga los datos del dashboard
export const useDashboardData = () => {
  // Estado para guardar los datos ya contados
  const [data, setData] = useState<DashboardData | null>(null);

  // Estado para indicar si todavía se está cargando
  const [loading, setLoading] = useState(true);

  // Efecto que se ejecuta una vez al montar el componente
  useEffect(() => {
    // Función asincrónica que llama a la API
    const fetchDashboardData = async () => {
      try {
        // Hacemos todas las peticiones en paralelo
        const [r, p, s, c] = await Promise.all([
          api.get<any[]>('/redes'),       // GET /redes
          api.get<any[]>('/proyectos'),   // GET /proyectos
          api.get<any[]>('/servicios'),   // GET /servicios
          api.get<any[]>('/categorias'),  // GET /categorias
        ]);

        // Guardamos el conteo de cada entidad
        setData({
          redes: r.data.length,
          proyectos: p.data.length,
          servicios: s.data.length,
          categorias: c.data.length,
        });
      } catch (error) {
        console.error('Error al cargar el dashboard:', error);
        setData(null); // En caso de error, limpiamos los datos
      } finally {
        setLoading(false); // Siempre desactivamos loading
      }
    };

    fetchDashboardData(); // Ejecutamos al montar
  }, []); // Solo una vez

  // Retornamos el estado actual del hook
  return { data, loading };
};
