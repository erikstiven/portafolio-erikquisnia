// components/SeccionProyectos.tsx
'use client';

import { useMemo, useState, useEffect, type ReactNode } from 'react';
import ProjectCard from './ProjectCard';
import type { Proyecto } from '@/types/proyecto';
import CarouselGrid from './CarouselGrid';

type CategoriaLite = { id: number; nombre: string };

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

// normaliza a number (soporta "1" o 1)
const toNum = (v: unknown) => {
  const n = Number(v);
  return Number.isFinite(n) ? n : NaN;
};

interface Props {
  proyectos: Proyecto[] | { items?: Proyecto[] } | unknown;
  categorias?: CategoriaLite[] | unknown;
}

export default function SeccionProyectos({ proyectos, categorias }: Props) {
  const isMobile = useIsMobile();
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<number | null>(null);
  const [tocado, setTocado] = useState(false);

  // 1) Normaliza proyectos a array
  const proyectosArr: Proyecto[] = Array.isArray(proyectos)
    ? proyectos
    : (proyectos as any)?.items && Array.isArray((proyectos as any).items)
    ? (proyectos as any).items
    : [];

  // 2) Normaliza categorías: usa las que llegan o constrúyelas desde proyectos
  const categoriasArr: CategoriaLite[] = useMemo(() => {
    if (Array.isArray(categorias) && categorias.length) {
      return (categorias as CategoriaLite[]).map((c) => ({ id: toNum(c.id), nombre: c.nombre }));
    }
    // fallback desde proyectos
    const map = new Map<number, string>();
    for (const p of proyectosArr) {
      const id = toNum((p as any).categoriaId);
      if (!Number.isNaN(id)) {
        const nombre = (p as any).categoriaNombre || (p as any).categoria?.nombre || `Cat ${id}`;
        if (!map.has(id)) map.set(id, String(nombre));
      }
    }
    return Array.from(map.entries()).map(([id, nombre]) => ({ id, nombre }));
  }, [categorias, proyectosArr]);

  // 3) Selección inicial: si hay destacados
  useEffect(() => {
    if (!tocado && proyectosArr.length > 0) {
      if (proyectosArr.some((p) => p.destacado)) setCategoriaSeleccionada(-1);
      else setCategoriaSeleccionada(null);
    }
  }, [proyectosArr, tocado]);

  const select = (val: number | null) => {
    setTocado(true);
    setCategoriaSeleccionada(val);
  };

  // 4) Contadores
  const destacadosCount = useMemo(
    () => proyectosArr.filter((p) => p.destacado).length,
    [proyectosArr]
  );

  const counts = useMemo(() => {
    const acc: Record<number, number> = {};
    for (const c of categoriasArr) acc[c.id] = 0;
    for (const p of proyectosArr) {
      const key = toNum((p as any).categoriaId);
      if (!Number.isNaN(key)) acc[key] = (acc[key] ?? 0) + 1;
    }
    return acc;
  }, [proyectosArr, categoriasArr]);

  // 5) Filtrado según botón
  const proyectosFiltrados = useMemo(() => {
    if (categoriaSeleccionada === -1) {
      const dest = proyectosArr.filter((p) => p.destacado);
      return dest.length ? dest : proyectosArr;
    }
    if (categoriaSeleccionada == null) return proyectosArr;
    return proyectosArr.filter(
      (p) => toNum((p as any).categoriaId) === toNum(categoriaSeleccionada)
    );
  }, [proyectosArr, categoriaSeleccionada]);

  // 6) Slides desktop (3×2 = 6 por slide)
  const slides: ReactNode[][] = useMemo(() => {
    if (isMobile) return [[]];
    const PAGE_SIZE = 6;
    const out: ReactNode[][] = [];
    for (let i = 0; i < proyectosFiltrados.length; i += PAGE_SIZE) {
      const slice = proyectosFiltrados.slice(i, i + PAGE_SIZE).map((proy) => (
        <ProjectCard
          key={proy.id}
          titulo={proy.titulo}
          descripcion={proy.descripcion}
          imagenUrl={proy.imagenUrl}
          tecnologias={(proy as any).tecnologias}
          demoUrl={proy.demoUrl}
          githubUrl={proy.githubUrl}
          destacado={proy.destacado}
          nivel={proy.nivel}
          tipo={
            categoriasArr.find((c) => c.id === toNum((proy as any).categoriaId))?.nombre ?? ''
          }
        />
      ));
      out.push(slice);
    }
    return out.length ? out : [[]];
  }, [isMobile, proyectosFiltrados, categoriasArr]);

  const Empty = (
    <div className="py-8 text-center text-gray-500">
    </div>
  );

  return (
    <section id="proyectos" className="pt-10 md:pt-14 scroll-mt-28 border-t border-slate-200 mt-10">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <h2 className="text-5xl font-bold mb-2 text-left md:text-left">Proyectos</h2>
        <h2 className="text-5xl font-bold mb-4 text-left md:text-left">s</h2>

        {/* Filtros */}
        <div className="flex justify-center">
          <div className="flex gap-3 mb-8 overflow-x-auto sm:overflow-visible py-2 px-1 sm:px-0 scrollbar-thin scrollbar-thumb-purple-400 scrollbar-track-transparent">
            <button
              onClick={() => select(null)}
              className={`min-w-[140px] flex-shrink-0 px-4 py-2 rounded-xl font-medium transition ${
                categoriaSeleccionada === null
                  ? 'bg-purple-pink text-white shadow-lg border border-purple-pink'
                  : 'text-purple-600 hover:bg-gray-200 border-2 border-purple-600 hover:border-purple-pink'
              }`}
              aria-pressed={categoriaSeleccionada === null}
            >
              Todos ({proyectosArr.length})
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
              Destacados ({destacadosCount})
            </button>

            {categoriasArr.map((cat) => (
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

        {/* Contenido */}
        {proyectosArr.length === 0 && Empty}

        {isMobile ? (
          proyectosFiltrados.length === 0 ? (
            Empty
          ) : (
            <div
              className="-mx-4 px-4 flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-purple-400"
              style={{ WebkitOverflowScrolling: 'touch' }}
            >
              {proyectosFiltrados.map((proy) => (
                <div key={proy.id} className="snap-center shrink-0 w-[100%]">
                  <ProjectCard
                    titulo={proy.titulo}
                    descripcion={proy.descripcion}
                    imagenUrl={proy.imagenUrl}
                    tecnologias={(proy as any).tecnologias}
                    demoUrl={proy.demoUrl}
                    githubUrl={proy.githubUrl}
                    destacado={proy.destacado}
                    nivel={proy.nivel}
                    tipo={
                      categoriasArr.find((c) => c.id === toNum((proy as any).categoriaId))?.nombre ??
                      ''
                    }
                  />
                </div>
              ))}
            </div>
          )
        ) : proyectosFiltrados.length === 0 ? (
          Empty
        ) : (
          <CarouselGrid slides={slides} />
        )}
      </div>
    </section>
  );
}
