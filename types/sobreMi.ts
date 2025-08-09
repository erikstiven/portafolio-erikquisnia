export type SobreMi = {
  nombre: string;
  rol: string;
  resumen: string;       // párrafo 1
  extra?: string;        // párrafos extra (opcional)
  fotoUrl: string;       // ej: "/me.jpg" en /public
  cvUrl?: string;        // ej: "/cv.pdf" en /public
};
