import type { SobreMi } from "@/types/sobreMi";

export const SOBRE_MI: SobreMi = {
  nombre: "Erik Quisinia", // ← cámbialo si deseas
  rol: "Ingeniero de Software y Desarrollador Full-Stack",
  resumen:
    "Inicié en la programación como un hobby hace más de 4 años. Hoy sigo aprendiendo y mejorando mis habilidades para construir aplicaciones web robustas y usables.",
  extra:
    "Entre mis logros destaco el desarrollo y despliegue de una aplicación web de telemedicina asincrónica para seguimiento y control de pacientes diabéticos (tesis universitaria), donde implementé notificaciones y recordatorios para mejorar la adherencia al tratamiento, logrando un aumento del 20% en la participación de los pacientes. Me apasiona aprender nuevas tecnologías, asumir retos y trabajar en equipo. Aquí comparto mi CV con más detalle sobre experiencia, logros y formación.",
  fotoUrl: "/me.jpg",     // coloca tu foto en /public/me.jpg
  cvUrl: "/cv.pdf",       // opcional: /public/cv.pdf
};
