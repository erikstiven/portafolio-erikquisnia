import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // lista de dominios remotos desde los que se permite cargar imágenes
    domains: ["res.cloudinary.com"],
    // opcional: si quieres ser más explícito en los patrones permitidos
    // remotePatterns: [
    //   {
    //     protocol: "https",
    //     hostname: "res.cloudinary.com",
    //     pathname: "/**",
    //   },
    // ],
  },
  // …otras opciones de configuración que tengas
};

export default nextConfig;
