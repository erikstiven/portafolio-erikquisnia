import Image from "next/image";
import { FaDownload } from "react-icons/fa";
import type { SobreMi } from "@/types/sobreMi";

export default function SeccionSobreMiSimple({
  nombre, rol, resumen, extra, fotoUrl, cvUrl,
}: SobreMi) {
  const foto = fotoUrl?.trim() ? fotoUrl : "/avatar.png";

  return (
    <section id="sobremi" className="py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <h2 className="text-4xl font-bold mb-2 text-left md:text-left">
          Sobre <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">Mí</span>
        </h2>
        <div className="h-1 w-16 rounded-full  mb-8" />

        {/* desktop: [texto | foto] */}
        <div className="md:flex md:items-start md:gap-10">
          {/* TEXTO - izquierda */}
          <div className="md:order-1 md:flex-1 text-pretty
               text-base md:text-lg leading-relaxed space-y-4 max-w-[72ch]">
            <p>
              Hola 👋, soy <strong className="text-slate-900">{nombre}</strong>,{" "}
              <strong className="text-purple-600">{rol}</strong>.
            </p>
            <p>{resumen}</p>
            {extra && <p>{extra}</p>}

            {cvUrl && (
              <a
                href={cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold
                           bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md hover:shadow-lg
                           transition-transform active:scale-95"
              >
                <FaDownload className="text-xs" />
                Descargar CV
              </a>
            )}
          </div>

          {/* FOTO - derecha */}
          <div className="md:order-2 md:ml-auto mt-6 md:mt-0">
            <div className="relative h-48 w-48 md:h-56 md:w-56 mx-auto md:mx-0">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 blur opacity-30" />
              <Image
                src={foto}
                alt={`Foto de ${nombre}`}
                fill
                className="rounded-full object-cover ring-4 ring-white shadow-xl"
                sizes="(max-width: 768px) 12rem, 14rem"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
