'use client';

import { useMemo, useState, useEffect, type ReactNode } from 'react';
import ProjectCard from './ProjectCard';
import type { Proyecto, Categoria } from '@/types/proyecto';
import CarouselGrid from './CarouselGrid';

// ── Hook: detectar móvil (<640px)
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 639px)');
    const onChange = () => setIsMobile(mq.matches);
    onChange();
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return isMobile;
}

interface Props {
  proyectos: Proyecto[];
  categorias: Categoria[];
}

export default function SeccionProyectos({ proyectos, categorias }: Props) {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<number | null>(null);
  const [tocado, setTocado] = useState(false); // <- para no pisar la selección del usuario
  const isMobile = useIsMobile();

  // Al cargar datos por primera vez, setear ⭐ Destacados si existen
  useEffect(() => {
    if (!tocado && proyectos.length > 0) {
      if (proyectos.some(p => p.destacado)) {
        setCategoriaSeleccionada(-1);
      } else {
        setCategoriaSeleccionada(null);
      }
    }
  }, [proyectos, tocado]);

  const select = (val: number | null) => {
    setTocado(true);
    setCategoriaSeleccionada(val);
  };

  // contadores por categoría
  const counts = useMemo(() => {
    const acc: Record<number, number> = {};
    for (const c of categorias) acc[c.id] = 0;
    for (const p of proyectos) {
      const key = Number((p as any).categoriaId);
      if (!Number.isNaN(key)) acc[key] = (acc[key] ?? 0) + 1;
    }
    return acc;
  }, [proyectos, categorias]);

  const destacadosCount = useMemo(
    () => proyectos.filter(p => p.destacado).length,
    [proyectos]
  );

  const proyectosFiltrados = useMemo(() => {
    if (categoriaSeleccionada === -1) {
      const dest = proyectos.filter(p => p.destacado);
      return dest.length ? dest : proyectos; // fallback si no hay destacados
    }
    if (categoriaSeleccionada == null) return proyectos;
    return proyectos.filter(p => p.categoriaId === categoriaSeleccionada);
  }, [proyectos, categoriaSeleccionada]);

  // slides desktop (3×2 = 6 por slide)
  const slides: ReactNode[][] = useMemo(() => {
    if (isMobile) return [[]]; // no usamos carousel en mobile
    const PAGE_SIZE = 6;
    const out: ReactNode[][] = [];
    for (let i = 0; i < proyectosFiltrados.length; i += PAGE_SIZE) {
      const slice = proyectosFiltrados.slice(i, i + PAGE_SIZE).map(proy => (
        <ProjectCard
          key={proy.id}
          titulo={proy.titulo}
          descripcion={proy.descripcion}
          imagenUrl={proy.imagenUrl}
          tecnologias={proy.tecnologias}
          demoUrl={proy.demoUrl}
          githubUrl={proy.githubUrl}
          destacado={proy.destacado}
          nivel={proy.nivel}
          tipo={categorias.find(c => c.id === proy.categoriaId)?.nombre ?? ''}
        />
      ));
      out.push(slice);
    }
    return out.length ? out : [[]];
  }, [isMobile, proyectosFiltrados, categorias]);

  return (
    <section id="proyectos" className="pt-10 md:pt-14 scroll-mt-28 border-t border-slate-200 mt-10">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <h2 className="text-4xl font-bold mb-2 text-left md:text-left">Proyectos</h2>

        <p className="text-gray-600 mb-6 leading-relaxed max-w-[72ch] text-pretty text-base md:text-lg">
          Aquí presento proyectos construidos de principio a fin: e-commerce con pasarela de pago,
          sistemas internos, dashboards y sitios rápidos y accesibles. Trabajo con Next.js/React,
          TypeScript y Laravel/Node sobre PostgreSQL, priorizando rendimiento, seguridad y buenas
          prácticas. Cada tarjeta incluye demo y repositorio para revisar estructura y decisiones técnicas.
        </p>

        {/* filtros centrados */}
        <div className="flex justify-center">
          <div
            className="flex gap-3 mb-8 overflow-x-auto sm:overflow-visible py-2 px-1 sm:px-0
                       scrollbar-thin scrollbar-thumb-purple-400 scrollbar-track-transparent"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            <button
              onClick={() => select(null)}
              className={`min-w-[140px] flex-shrink-0 px-4 py-2 rounded-xl font-medium transition ${
                categoriaSeleccionada === null
                  ? 'bg-purple-pink text-white shadow-lg border border-purple-pink'
                  : 'text-purple-600 hover:bg-gray-200 border-2 border-purple-600 hover:border-purple-pink'
              }`}
              aria-pressed={categoriaSeleccionada === null}
            >
              Todos ({proyectos.length})
            </button>

            <button
              onClick={() => select(-1)}
              className={`min-w-[160px] flex-shrink-0 px-4 py-2 rounded-xl font-medium transition ${
                categoriaSeleccionada === -1
                  ? 'bg-yellow-500 text-white shadow-lg border border-yellow-500'
                  : 'text-yellow-700 hover:bg-gray-200 border-2 border-yellow-600 hover:border-yellow-500'
              }`}
              aria-pressed={categoriaSeleccionada === -1}
            >
              ⭐ Destacados ({destacadosCount})
            </button>

            {categorias.map(cat => (
              <button
                key={cat.id}
                onClick={() => select(cat.id)}
                className={`min-w-[160px] flex-shrink-0 px-4 py-2 rounded-xl font-medium transition ${
                  categoriaSeleccionada === cat.id
                    ? 'bg-purple-pink text-white shadow-lg border border-purple-pink'
                    : 'text-purple-600 hover:bg-gray-200 border-2 border-purple-600 hover:border-purple-pink'
                }`}
                aria-pressed={categoriaSeleccionada === cat.id}
              >
                {cat.nombre} ({counts[cat.id] ?? 0})
              </button>
            ))}
          </div>
        </div>

        {/* MOBILE: fila única desplazable */}
        {isMobile ? (
          <div
            className="-mx-4 px-4 flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory
                       scrollbar-thin scrollbar-thumb-purple-400"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            {proyectosFiltrados.map(proy => (
              <div key={proy.id} className="snap-center shrink-0 w-[100%]">
                <ProjectCard
                  titulo={proy.titulo}
                  descripcion={proy.descripcion}
                  imagenUrl={proy.imagenUrl}
                  tecnologias={proy.tecnologias}
                  demoUrl={proy.demoUrl}
                  githubUrl={proy.githubUrl}
                  destacado={proy.destacado}
                  nivel={proy.nivel}
                  tipo={categorias.find(c => c.id === proy.categoriaId)?.nombre ?? ''}
                />
              </div>
            ))}
          </div>
        ) : (
          <CarouselGrid slides={slides} />
        )}
      </div>
    </section>
  );
}
