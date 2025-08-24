'use client';
import { useEffect, useState } from 'react';
import { FaDownload } from 'react-icons/fa';
import api from '@/lib/api';

type Perfil = {
  nombreCompleto?: string | null;
  descripcionUnoSobreMi?: string | null;
  descripcionDosSobreMi?: string | null;
  fotoSobreMiUrl?: string | null;
  cvUrl?: string | null;          // se mantiene por si quieres mostrar el link
  cvDownloadUrl?: string | null;  // opcional si tu API lo devuelve
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
    return () => {
      alive = false;
    };
  }, []);

  const handleDownloadCV = async () => {
    setDownloading(true);
    try {
      // 🔍 Debug: Ver qué datos tenemos
      console.log('Datos del perfil:', perfil);
      console.log('CV URL:', perfil?.cvUrl);
      
      // Verificar si hay CV disponible
      if (!perfil?.cvUrl) {
        console.log('❌ No hay cvUrl disponible');
        alert('No hay CV disponible para descargar');
        return;
      }

      console.log('✅ Intentando descargar desde:', perfil.cvUrl);

      // Usar directamente la URL (o tu endpoint de descarga)
      const nombreArchivo = `CV_${perfil?.nombreCompleto?.replace(/\s+/g, '_') || 'Usuario'}.pdf`;
      const link = document.createElement('a');
      link.href = perfil.cvUrl;
      link.download = nombreArchivo;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      console.log('✅ Descarga iniciada');
      
    } catch (error) {
      console.error('❌ Error al descargar CV:', error);
      alert('Error al descargar el CV. Por favor, inténtalo de nuevo.');
    } finally {
      // Pequeña espera para que la animación sea visible aunque sea rápido
      setTimeout(() => setDownloading(false), 400);
    }
  };

  if (loading) {
    return (
      <section
        id="sobremi"
        className="pt-10 md:pt-14 scroll-mt-28 border-t border-slate-200 mt-10"
      >
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
    <section
      id="sobremi"
      className="t-10 md:pt-14 scroll-mt-28 border-t border-slate-200 mt-10"
    >
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

            {/* Solo mostrar botón si hay CV disponible */}
            {perfil?.cvUrl && (
              <button
                onClick={handleDownloadCV}
                disabled={downloading}
                aria-busy={downloading ? 'true' : 'false'}
                className={
                  `flex items-center gap-3 px-6 py-3 text-white rounded-lg shadow transition ` +
                  `transform active:scale-95 active:translate-y-0.5 ` +
                  `${downloading ? 'bg-gradient-to-r from-purple-400 to-pink-400 cursor-wait' : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:shadow-md'}` +
                  ` disabled:opacity-60 disabled:cursor-not-allowed`
                }
                title={downloading ? 'Descargando...' : 'Descargar CV'}
              >
                {/* Spinner cuando descarga */}
                {downloading ? (
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                  </svg>
                ) : (
                  <FaDownload className="h-4 w-4" aria-hidden="true" />
                )}

                <span className="font-medium">
                  {downloading ? 'Descargando...' : 'Descargar CV'}
                </span>
              </button>
            )}
          </div>

          {/* Foto de perfil */}
          <div className="w-full md:w-auto order-1 md:order-2 flex justify-center">
            <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full border-4 border-white shadow-xl overflow-hidden">
              {perfil?.fotoSobreMiUrl ? (
                <img
                  src={perfil.fotoSobreMiUrl}
                  alt={`${perfil.nombreCompleto || 'Foto de perfil'}`}
                  className="w-full h-full object-cover object-top"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                    (e.target as HTMLImageElement).nextElementSibling?.classList.remove(
                      'hidden'
                    );
                  }}
                />
              ) : null}
              <div
                className={`absolute inset-0 bg-gray-200 flex items-center justify-center ${
                  perfil?.fotoSobreMiUrl ? 'hidden' : ''
                }`}
              >
                <span className="text-gray-500">Foto de perfil</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
