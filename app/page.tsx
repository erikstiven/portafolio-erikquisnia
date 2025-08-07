'use client';
import { useEffect, useState } from 'react';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import Navbar from '@/components/Navbar';

interface Categoria { id: number; nombre: string; }
interface Proyecto { id: number; titulo: string; descripcion: string; imagenUrl: string; categoriaId: number; tecnologias: string; demoUrl?: string; githubUrl?: string; }
interface Experiencia {
  id: number;
  puesto: string;
  empresa: string;
  descripcion: string;
  fechaInicio: string;
  fechaFin?: string | null;
  actual?: boolean;         // ← Opcional, por si en el futuro lo usas
  actualmente?: boolean;    // ← Añade esto, porque así llega del backend
}

function mostrarRangoFechas(fechaInicio: string, fechaFin?: string | null, actual?: boolean) {
  // Si fechaFin existe, no es vacío ni null, entonces la muestra
  const tieneFechaFin = fechaFin && typeof fechaFin === "string" && fechaFin.trim() !== "";
  if (tieneFechaFin) {
    return `${formatFecha(fechaInicio)} - ${formatFecha(fechaFin!)}`;
  }
  // Si NO hay fechaFin, pero actual = true, muestra "Actualidad"
  if (actual) {
    return `${formatFecha(fechaInicio)} - Actualidad`;
  }
  // Si no es actual y no hay fechaFin, solo la fecha de inicio
  return formatFecha(fechaInicio);
}



function formatFecha(fechaIso?: string | null) {
  if (!fechaIso) return '';
  const date = new Date(fechaIso);
  const meses = ['ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO', 'JULIO', 'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE'];
  return `${meses[date.getMonth()]} ${date.getFullYear()}`;
}

export default function LandingPage() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [proyectos, setProyectos] = useState<Proyecto[]>([]);
  const [experiencias, setExperiencias] = useState<Experiencia[]>([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<number | null>(null);

  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_API_URL + '/api/categorias')
      .then(r => r.json())
      .then(data => Array.isArray(data) ? setCategorias(data) : setCategorias([]))
      .catch(() => setCategorias([]));
  }, []);

  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_API_URL + '/api/proyectos')
      .then(r => r.json())
      .then(data => Array.isArray(data) ? setProyectos(data) : setProyectos([]))
      .catch(() => setProyectos([]));
  }, []);

  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_API_URL + '/api/experiencias')
      .then(r => r.json())
      .then(data => Array.isArray(data) ? setExperiencias(data) : setExperiencias([]))
      .catch(() => setExperiencias([]));
  }, []);

  const proyectosFiltrados = categoriaSeleccionada
    ? proyectos.filter(p => p.categoriaId === categoriaSeleccionada)
    : proyectos;

  return (
    <>
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 md:px-6 pt-10 pb-20">
        {/* HERO SECTION */}
        <section className="w-full flex flex-col md:flex-row items-center justify-between gap-10 md:gap-20 py-14 md:py-20 px-2">
          {/* Imagen redonda */}
          <div className="flex-shrink-0 flex justify-center w-full md:w-auto">
            <img
              src="https://scontent.fmch1-1.fna.fbcdn.net/v/t39.30808-6/480317638_2225517321184080_7386630286593284650_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeGNn2bGrcOaHSKREethp_7FdRpVWNEuP5d1GlVY0S4_l0AeHw1nXHlzGSJpqQsnXUI9C2X_xQHnwsDfBfdIPHif&_nc_ohc=2eb3VHOKvW0Q7kNvwEbm6Tf&_nc_oc=AdkyMbBM9YSIuuUhk5Ixxi-gRMbi4ID6g-7nU2EHFzftaHT0rqL41dXB23Pb2gK8s50&_nc_zt=23&_nc_ht=scontent.fmch1-1.fna&_nc_gid=RxgCMLE_dt_LSvrNZcQIrA&oh=00_AfVFmsSjnwbuHx5lx5IVsYl1HF2ElVy0TtPTN7jwxomheA&oe=6899CEC2"
              alt="Erik Quisnia"
              className="w-48 h-48 md:w-60 md:h-60 rounded-full object-cover border-8 border-white shadow-2xl"
            />
          </div>
          {/* Texto principal */}
          <div className="flex-1 flex flex-col justify-center items-center md:items-start text-center md:text-left">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-2 leading-tight font-sans">
              Hola, Soy <span className="text-blue-700">Erik Quisnia</span>
            </h1>
            <div className="flex flex-col md:flex-row items-center md:items-end gap-2 mb-2">
              <span className="text-orange-500 font-bold text-2xl md:text-2xl">Full Stack</span>
              <span className="font-semibold text-2xl md:text-2xl text-black ml-1">Developer</span>
            </div>
            <p className="text-lg md:text-xl text-gray-700 mb-4 max-w-xl font-normal">
              +3 años de experiencia.{' '}
              <span className="font-semibold text-orange-500">
                Ingeniero de Software y Desarrollador Web de Riobamba, Ecuador.
              </span>
              <br />
              Especializado en el desarrollo de aplicaciones web únicas y robustas.
            </p>
            <div className="flex gap-3 items-center mt-2">
              {/* LinkedIn */}
              <a href="https://linkedin.com/in/erikquisnia" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-blue-200 shadow transition"
                aria-label="LinkedIn">
                <FaLinkedin className="text-xl text-blue-700" />
              </a>
              {/* GitHub */}
              <a href="https://github.com/erikquisnia" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 shadow transition"
                aria-label="GitHub">
                <FaGithub className="text-xl text-gray-700" />
              </a>
              {/* Contáctame */}
              <a href="#contacto"
                className="ml-2 px-6 py-2 rounded-full bg-orange-500 hover:bg-orange-600 text-white text-base font-semibold shadow transition">
                Contáctame
              </a>
            </div>
          </div>
        </section>

        {/* EXPERIENCIA PROFESIONAL - EXACTO AL EJEMPLO */}
        <section id="experiencia" className="py-12">
          <div className="max-w-6xl mx-auto w-full px-4 md:px-8">
            {/* Título alineado */}
            <h2 className="text-4xl font-bold font-sans mb-10">
              Experiencia Profesional
            </h2>
            {/* Timeline */}
            <div className="relative flex flex-col gap-12">
              {/* Línea vertical left */}
              <div className="absolute left-7 top-0 bottom-0 w-1 bg-gray-200 z-0 rounded-full" />
              {experiencias.map((exp, idx) => (
                <div key={exp.id} className="flex items-start relative z-10">
                  {/* Nodo timeline */}
                  <div className="flex flex-col items-center mr-6">
                    <div className="bg-white border-4 border-orange-400 rounded-full w-14 h-14 flex items-center justify-center shadow">
                      {/* Icono (puedes cambiarlo si deseas) */}
                      <svg className="w-7 h-7 text-orange-400" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    {/* Línea sólo si NO es el último */}
                    {idx !== experiencias.length - 1 && (
                      <div className="w-1 flex-1 bg-gray-200 my-1"></div>
                    )}
                  </div>
                  {/* Contenido */}
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="text-2xl font-bold text-orange-500">{exp.puesto}</span>
                      <span className="text-lg font-semibold text-gray-800">- {exp.empresa}</span>
                    </div>
                    {/* Fecha CORREGIDA */}
                    <div className="text-gray-500 mb-2 font-semibold">
                      {mostrarRangoFechas(exp.fechaInicio, exp.fechaFin, exp.actualmente)}
                    </div>


                    <p className="text-lg text-gray-700">{exp.descripcion}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>





        {/* Otros módulos... */}
      </main>
    </>
  );
}
