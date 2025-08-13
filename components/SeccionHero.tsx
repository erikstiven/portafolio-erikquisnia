'use client';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import HeroParticles from '@/components/HeroParticles';

const phone = '0979018689';
const waPhone = '593' + phone.replace(/^0/, ''); 
const waMsg = encodeURIComponent('Hola, vi tu portafolio y me gustaría conversar contigo.');

export default function SeccionHero() {
  return (
    // Full-bleed: ocupa todo el ancho del viewport
    <section id="hero" className="relative w-full overflow-hidden pt-10 md:pt-14 scroll-mt-28">
      {/* Fondo/animación de ancho completo */}
      <div className="absolute inset-0 -z-20 bg-gradient-to-br from-white via-violet-50/60 to-white" />
      <HeroParticles />

      {/* Contenido centrado en container */}
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        {/* “Tarjeta” del hero con bordes y separación */}
        <div className="relative z-10 rounded-3xl md:rounded-[2rem] mb-12 shadow-none">
          <div className="flex flex-col md:flex-row items-center justify-between gap-10 md:gap-20 py-14 md:py-20">
            {/* Imagen */}
            <div className="flex-shrink-0 flex justify-center w-full md:w-auto">
              <img
                src="https://scontent.fmch1-1.fna.fbcdn.net/v/t39.30808-6/480317638_2225517321184080_7386630286593284650_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeGNn2bGrcOaHSKREethp_7FdRpVWNEuP5d1GlVY0S4_l0AeHw1nXHlzGSJpqQsnXUI9C2X_xQHnwsDfBfdIPHif&_nc_ohc=2eb3VHOKvW0Q7kNvwEbm6Tf&_nc_oc=AdkyMbBM9YSIuuUhk5Ixxi-gRMbi4ID6g-7nU2EHFzftaHT0rqL41dXB23Pb2gK8s50&_nc_zt=23&_nc_ht=scontent.fmch1-1.fna&_nc_gid=RxgCMLE_dt_LSvrNZcQIrA&oh=00_AfVFmsSjnwbuHx5lx5IVsYl1HF2ElVy0TtPTN7jwxomheA&oe=6899CEC2"
                alt="Erik Quisnia"
                className="w-48 h-48 md:w-60 md:h-60 rounded-full object-cover border-8 border-white shadow-2xl"
              />
            </div>

            {/* Texto */}
            <div className="flex-1 flex flex-col justify-center items-center md:items-start text-center md:text-left">
              <h1 className="text-5xl md:text-6xl font-extrabold mb-2 leading-tight font-sans">
                Hola, Soy{' '}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
                  Erik Quisnia
                </span>
              </h1>

              <div className="flex flex-col md:flex-row items-center md:items-end gap-2 mb-2">
                <span className="text-blue-700 font-bold text-2xl">Full Stack</span>
                <span className="font-semibold text-2xl text-black ml-1">Developer</span>
              </div>

              <p className="text-lg md:text-xl text-gray-700 mb-4 max-w-xl font-normal">
                +3 años de experiencia.{' '}
                <span className="font-semibold text-blue-700">
                  Ingeniero de Software y Desarrollador Web de Riobamba, Ecuador.
                </span>
                <br />
                Especializado en el desarrollo de aplicaciones web únicas y robustas.
              </p>

              <div className="flex gap-3 items-center mt-2">
                <a
                  href="https://linkedin.com/in/erikquisnia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-blue-200 shadow transition"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin className="text-xl text-blue-700" />
                </a>

                <a
                  href="https://github.com/erikstiven"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 shadow transition"
                  aria-label="GitHub"
                >
                  <FaGithub className="text-xl text-gray-700" />
                </a>

                <a
                  href={`https://wa.me/${waPhone}?text=${waMsg}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-2 px-6 py-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-base font-semibold shadow transition"
                >
                  Contáctame
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
