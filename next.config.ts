import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '**',
      },
    ],
    formats: ["image/avif", "image/webp"],
  },
  // appDir ya está habilitado por defecto en versiones recientes
  // Puedes omitirlo si no necesitas desactivarlo
};

export default nextConfig;