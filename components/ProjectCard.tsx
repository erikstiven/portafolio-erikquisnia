'use client';

import { FaGithub, FaStar, FaExternalLinkAlt } from 'react-icons/fa';

interface ProjectCardProps {
  titulo: string;
  descripcion: string;
  imagenUrl: string;
  tecnologias: string;
  demoUrl?: string;
  githubUrl?: string;
  destacado?: boolean;
  nivel?: string;
  tipo?: string;
}

export default function ProjectCard({
  titulo,
  descripcion,
  imagenUrl,
  tecnologias,
  demoUrl,
  githubUrl,
  destacado,
  nivel,
  tipo,
}: ProjectCardProps) {
  return (
    <div className="bg-[#191936] rounded-2xl shadow-xl overflow-hidden flex flex-col border-2 border-gray-200 hover:border-purple-100 transition group">
      {/* Imagen y etiquetas */}
      <div className="relative h-44 bg-gradient-to-tr from-white to-white flex items-center justify-center">
        <img
          src={imagenUrl}
          alt={titulo}
          className="rounded-xl w-[90%] h-36 object-cover mx-auto mt-4 shadow-md group-hover:scale-105 transition"
        />

        {/* Tipo (arriba izquierda) */}
        {tipo && (
          <span className="absolute top-2 left-2 bg-black/80 text-white text-xs px-3 py-1 rounded-full shadow-sm">
            {tipo}
          </span>
        )}

        {/* Nivel + Destacado (arriba derecha) */}
        <div className="absolute top-2 right-2 flex items-center gap-2">
          {nivel && (
            <span className="bg-purple-600 text-white text-xs px-3 py-1 rounded-full shadow-sm">
              {nivel}
            </span>
          )}
          {destacado && (
            <span className="bg-yellow-400 text-black p-2 rounded-full shadow-sm flex items-center justify-center">
              <FaStar className="text-xs" />
            </span>
          )}
        </div>
      </div>

      {/* Contenido */}
      <div className="flex-1 p-5 flex flex-col">
        <h3 className="text-lg font-bold text-white mb-1">{titulo}</h3>
        <p className="text-gray-300 text-sm mb-4 line-clamp-3">{descripcion}</p>

        {/* Tecnologías */}
        <div className="flex flex-wrap gap-2 mb-4">
          {tecnologias.split(',').map((tech) => (
            <span
              key={tech}
              className="text-xs border text-white px-2 py-1 rounded-sm font-semibold"
            >
              {tech.trim()}
            </span>
          ))}
        </div>

        {/* Botones */}
        <div className="flex gap-2 mt-auto">
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 border border-white bg-[#232333] text-white py-2 rounded-lg hover:bg-gray-900 transition font-medium"
            >
              <FaGithub /> Código
            </a>
          )}
          {demoUrl && (
            <a
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 rounded-lg font-medium shadow-md hover:scale-105 transition"
            >
              <FaExternalLinkAlt className="text-sm" /> Ver Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
