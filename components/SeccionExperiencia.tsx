'use client'

import type { Experiencia } from '@/types/experiencia'

interface Props {
  experiencias: Experiencia[]
}

const meses = [
  'ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO',
  'JULIO', 'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE'
]

function formatFecha(fechaIso?: string | null) {
  if (!fechaIso) return ''
  const d = new Date(fechaIso)
  return `${meses[d.getMonth()]} ${d.getFullYear()}`
}

function mostrarRango(
  inicio: string,
  fin?: string | null,
  actual?: boolean
) {
  if (fin && fin.trim()) return `${formatFecha(inicio)} – ${formatFecha(fin)}`
  if (actual) return `${formatFecha(inicio)} – Actualidad`
  return formatFecha(inicio)
}

/** Limpia texto que trae caracteres invisibles o soft hyphens y normaliza saltos */
function sanitizeDescription(raw?: string | null) {
  if (!raw) return ''
  // quitar soft-hyphen (\u00AD) y zero-width spaces, tabs extra, etc.
  const cleaned = raw.replace(/[\u00AD\u200B\u200C\u200D]/g, '')
    // normalizar CRLF a \n
    .replace(/\r\n/g, '\n')
    // trim espacios repetidos
    .replace(/[ \t]{2,}/g, ' ')
    .trim()
  return cleaned
}

export default function SeccionExperiencia({ experiencias }: Props) {
  return (
    <section id="experiencia" className="pt-10 md:pt-14 scroll-mt-28 border-t border-slate-200">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <h2 className="text-4xl font-bold mb-10">Experiencia Profesional</h2>
        <div className="relative flex flex-col gap-12">
          <div className="absolute left-7 top-0 bottom-0 w-1 bg-purple-400 z-0 rounded-full" />

          {experiencias.map((exp, i) => {
            const safe = sanitizeDescription(exp.descripcion)
            // separar párrafos por doble salto. saltos simples -> espacio
            const paragraphs = safe
              .split(/\n{2,}/)
              .map(p => p.replace(/\n/g, ' ').trim())
              .filter(Boolean)

            return (
              <div key={exp.id} className="flex items-start relative z-10">
                {/* marcador */}
                <div className="flex flex-col items-center mr-6">
                  <div className="w-14 h-14 rounded-full bg-white border-4 border-purple-400 flex items-center justify-center shadow">
                    <svg
                      className="w-7 h-7 text-purple-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2.5}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  {i !== experiencias.length - 1 && (
                    <div className="w-1 flex-1 bg-gray-900 my-1" />
                  )}
                </div>

                {/* contenido */}
                <div className="flex-1 min-w-0"> {/* <- min-w-0 importante */}
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="text-2xl font-bold text-purple-600">
                      {exp.puesto}
                    </span>
                    <span className="text-lg font-semibold text-gray-800">
                      – {exp.empresa}
                    </span>
                  </div>
                  <div className="text-gray-500 mb-2 font-semibold">
                    {mostrarRango(exp.fechaInicio, exp.fechaFin, exp.actualmente)}
                  </div>

                  {paragraphs.map((p, idx) => (
                    <p
                      key={idx}
                      className="text-lg text-gray-700 leading-relaxed max-w-full"
                      style={{
                        WebkitHyphens: 'auto', // opcional: quita si hifenación te sigue partiendo mal
                        hyphens: 'auto',
                        wordBreak: 'normal',
                        overflowWrap: 'anywhere' // evita overflow; probar 'normal' si prefieres
                      }}
                      lang="es"
                    >
                      {p}
                    </p>
                  ))}

                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
