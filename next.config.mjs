/** @type {import('next').NextConfig} */
const nextConfig = {
  // 🚫 No frenes el build por ESLint en producción
  eslint: {
    ignoreDuringBuilds: true,
  },
  // 🚫 No frenes el build por errores de types en producción
  typescript: {
    ignoreBuildErrors: true,
  },
  // ✅ Si usas imágenes de Cloudinary con next/image
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'res.cloudinary.com' }],
  },
};

export default nextConfig;
