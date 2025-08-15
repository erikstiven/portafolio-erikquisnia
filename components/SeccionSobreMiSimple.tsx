'use client';
import { useEffect, useState } from 'react';
import { FaDownload } from 'react-icons/fa';
import api from '@/lib/api';

type Perfil = {
  nombreCompleto?: string | null;
  descripcionUnoSobreMi?: string | null;
  descripcionDosSobreMi?: string | null;
  fotoSobreMiUrl?: string | null;
  cvUrl?: string | null;
  cvDownloadUrl?: string | null;
};

export default function SeccionSobreMiSimple() {
  const [perfil, setPerfil] = useState<Perfil | null>(null);
  const [downloading, setDownloading] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const { data } = await api.get<Perfil | Perfil[]>('/perfil');
        const p = Array.isArray(data) ? data[0] : data;
        if (alive) setPerfil(p ?? null);
      } catch {
        if (alive) setPerfil(null);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, []);

  const handleDownloadCV = async () => {
    if (!perfil?.cvUrl) return;

    setDownloading(true);
    try {
      // Crear nombre del archivo
      const nombreArchivo = `CV_${perfil.nombreCompleto?.replace(/\s+/g, '_') || 'Erik_Quisnia'}.pdf`;

      // Descargar el archivo como blob
      const response = await fetch(perfil.cvUrl);
      if (!response.ok) throw new Error('Error al obtener el archivo');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      // Crear enlace y simular click
      const link = document.createElement('a');
      link.href = url;
      link.download = nombreArchivo;
      document.body.appendChild(link);
      link.click();

      // Limpiar
      setTimeout(() => {
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      }, 100);

    } catch (error) {
      console.error('Error al descargar CV:', error);
      // Fallback: abrir en nueva pestaña
      if (perfil.cvUrl) {
        window.open(perfil.cvUrl, '_blank');
      }
    } finally {
      setDownloading(false);
    }
  };

  if (loading) {
    return (
      <section id="sobremi" className="pt-10 md:pt-14 scroll-mt-28 border-t border-slate-200 mt-10">
        <div className="container mx-auto px-4">
          <div className="animate-pulse flex flex-col md:flex-row items-center gap-8">
            <div className="w-full md:w-1/2 space-y-4">
              <div className="h-8 w-48 bg-gray-200 rounded"></div>
              <div className="h-4 w-24 bg-gray-200 rounded"></div>
              <div className="h-32 bg-gray-100 rounded"></div>
            </div>
            <div className="w-48 h-48 md:w-64 md:h-64 rounded-full bg-gray-200"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="sobremi" className="t-10 md:pt-14 scroll-mt-28 border-t border-slate-200 mt-10">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          {/* Contenido de texto */}
          <div className="w-full md:w-full order-2 md:order-1">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Sobre <span className="text-purple-600">mí</span>
            </h2>

            <div className="h-1 w-16  mb-6"></div>

            {perfil?.descripcionUnoSobreMi && (
              <p className="text-gray-700 mb-4 text-lg">
                {perfil.descripcionUnoSobreMi}
              </p>
            )}

            {perfil?.descripcionDosSobreMi && (
              <p className="text-gray-700 mb-6 text-lg">
                {perfil.descripcionDosSobreMi}
              </p>
            )}

            {perfil?.cvUrl && (
              <button
                onClick={handleDownloadCV}
                disabled={downloading}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg shadow hover:shadow-md transition"
              >
                <FaDownload />
                {downloading ? 'Descargando...' : 'Descargar CV'}
              </button>
            )}
          </div>

      {/* Opción 2: Ajustar posición con object-position */}
<div className="w-full md:w-auto order-1 md:order-2 flex justify-center">
  <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full border-4 border-white shadow-xl overflow-hidden">
    {perfil?.fotoSobreMiUrl ? (
      <img
        src={perfil.fotoSobreMiUrl}
        alt={`${perfil.nombreCompleto || 'Foto de perfil'}`}
        className="w-full h-full object-cover object-top" // Enfoca en la parte superior
        onError={(e) => {
          (e.target as HTMLImageElement).style.display = 'none';
          (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
        }}
      />
    ) : null}
    <div className={`absolute inset-0 bg-gray-200 flex items-center justify-center ${perfil?.fotoSobreMiUrl ? 'hidden' : ''}`}>
      <span className="text-gray-500">Foto de perfil</span>
    </div>
  </div>
</div>

        </div>
      </div>
    </section>
  );
}