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
  const isMobile = useIsMobile();

  // contadores
  const counts = useMemo(() => {
    const acc: Record<number, number> = {};
    for (const c of categorias) acc[c.id] = 0;
    for (const p of proyectos) {
      const key = Number((p as any).categoriaId);
      if (!Number.isNaN(key)) acc[key] = (acc[key] ?? 0) + 1;
    }
    return acc;
  }, [proyectos, categorias]);

  // filtro (incluye ⭐ Destacados con id -1)
  const proyectosFiltrados = useMemo(() => {
    if (categoriaSeleccionada === -1) return proyectos.filter(p => p.destacado);
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
    <section id="proyectos" className="py-12 bg-white scroll-mt-24 md:scroll-mt-28">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <h2 className="text-4xl font-bold mb-2">Proyectos</h2>
        <p className="text-gray-600 mb-6 leading-relaxed">
          Mis proyectos más emocionantes y creativos. Cada proyecto es el resultado de mi dedicación y pasión por la programación.
        </p>

        {/* filtros centrados */}
        <div className="flex justify-center">
          <div
            className="flex gap-3 mb-8 overflow-x-auto sm:overflow-visible py-2 px-1 sm:px-0
                       scrollbar-thin scrollbar-thumb-purple-400 scrollbar-track-transparent"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            <button
              onClick={() => setCategoriaSeleccionada(null)}
              className={`min-w-[140px] flex-shrink-0 px-4 py-2 rounded-xl font-medium transition ${
                categoriaSeleccionada === null
                  ? 'bg-purple-pink text-white shadow-lg border border-purple-pink'
                  : 'text-purple-600 hover:bg-gray-200 border-2 border-purple-600 hover:border-purple-pink'
              }`}
            >
              Todos ({proyectos.length})
            </button>

            <button
              onClick={() => setCategoriaSeleccionada(-1)}
              className={`min-w-[160px] flex-shrink-0 px-4 py-2 rounded-xl font-medium transition ${
                categoriaSeleccionada === -1
                  ? 'bg-yellow-500 text-white shadow-lg border border-yellow-500'
                  : 'text-yellow-700 hover:bg-gray-200 border-2 border-yellow-600 hover:border-yellow-500'
              }`}
            >
              ⭐ Destacados ({proyectos.filter(p => p.destacado).length})
            </button>

            {categorias.map(cat => (
              <button
                key={cat.id}
                onClick={() => setCategoriaSeleccionada(cat.id)}
                className={`min-w-[160px] flex-shrink-0 px-4 py-2 rounded-xl font-medium transition ${
                  categoriaSeleccionada === cat.id
                    ? 'bg-purple-pink text-white shadow-lg border border-purple-pink'
                    : 'text-purple-600 hover:bg-gray-200 border-2 border-purple-600 hover:border-purple-pink'
                }`}
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
              <div key={proy.id} className="snap-center shrink-0 w-[86%]">
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
          // DESKTOP/TABLET: carrusel 3×2
          <CarouselGrid slides={slides} />
        )}
      </div>
    </section>
  );
}
