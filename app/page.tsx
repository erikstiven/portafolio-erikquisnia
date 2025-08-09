'use client';

import SeccionHero from '@/components/SeccionHero';
import SeccionExperiencia from '@/components/SeccionExperiencia';
import SeccionProyectos from '@/components/SeccionProyectos';
import SeccionSobreMi from "@/components/SeccionSobreMi";
import Footer from '@/components/Footer';

import { useExperiencias } from '@/hooks/useExperiencias';
import { useProyectos } from '@/hooks/useProyectos';
import { useCategorias } from '@/hooks/useCategorias';
import { useSobreMi } from '@/hooks/useSobreMi';

export default function LandingPage() {
  const experiencias = useExperiencias();
  const proyectos = useProyectos();
  const categorias = useCategorias();
  const { data: sobreMi, loading, error } = useSobreMi();

  return (
    <>
      {/* HERO full-bleed */}
      <SeccionHero />

      {/* Contenido principal */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 pb-20">
        <SeccionExperiencia experiencias={experiencias} />
        <SeccionProyectos proyectos={proyectos} categorias={categorias} />

        {/* SOBRE MÍ (después de proyectos) */}
        {loading && <div className="animate-pulse h-52 rounded-2xl bg-gray-100 mb-10" />}
        {error && <p className="text-red-600 mb-10">Error: {error}</p>}
        {sobreMi && <SeccionSobreMi info={sobreMi} />}

        {/* FOOTER */}
        <Footer />
      </div>
    </>
  );
}
