import Image from 'next/image';
import type { SobreMi } from '@/types/sobreMi';

// ⬇️ Asegúrate de que el componente reciba { info }
type SobreMiProps = { info: SobreMi };

export default function SeccionSobreMi({ info }: SobreMiProps) {
  const { nombre, rol, resumen, logros = [], extra, fotoUrl, cvUrl, ubicacion, tags = [] } = info;

  return (
    <section id="sobremi" className="py-12">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <h2 className="text-4xl font-extrabold mb-8">
          Sobre <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">Mí</span>
        </h2>

        <div className="grid gap-8 md:grid-cols-[320px,1fr] items-start">
          <div className="flex md:block justify-center">
            <div className="relative w-56 h-56 md:w-72 md:h-72">
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-500 to-fuchsia-500 blur-2xl opacity-20" />
              <Image
                src={fotoUrl}
                alt={`Foto de ${nombre}`}
                fill
                className="rounded-full object-cover border-4 border-white shadow-xl"
                sizes="(max-width: 768px) 14rem, 18rem"
                priority
              />
            </div>
          </div>

          <div>
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <h3 className="text-2xl font-bold">{nombre}</h3>
              {ubicacion && <span className="text-sm px-2.5 py-1 rounded-full bg-gray-100 text-gray-700">{ubicacion}</span>}
            </div>

            <p className="text-blue-700 font-semibold mb-4">{rol}</p>
            <p className="text-gray-700 leading-relaxed mb-5">{resumen}</p>

            {logros.length > 0 && (
              <ul className="space-y-2 mb-5">
                {logros.map((l, i) => (
                  <li key={i} className="flex gap-2 text-gray-700">
                    <span className="mt-1 h-2 w-2 rounded-full bg-amber-400 shrink-0" />
                    <span>{l}</span>
                  </li>
                ))}
              </ul>
            )}

            {extra && <p className="text-gray-700 leading-relaxed mb-6">{extra}</p>}

            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {tags.map((t) => (
                  <span key={t} className="text-xs font-medium bg-gray-100 text-gray-700 px-2.5 py-1 rounded-full">
                    {t}
                  </span>
                ))}
              </div>
            )}

            <div className="flex flex-wrap gap-3">
              {cvUrl && (
                <a
                  href={cvUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white bg-gradient-to-r from-amber-400 to-orange-500 hover:brightness-110 transition shadow"
                >
                  Descargar CV
                </a>
              )}
              <a
                href="#proyectos"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 hover:border-blue-500 hover:text-blue-600 transition"
              >
                Ver Proyectos
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
