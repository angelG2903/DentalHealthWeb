/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true, // Desactiva la optimización de imágenes
    disableStaticImages: true, // Deshabilita la optimización de imágenes locales
    remotePatterns: [
      {
        protocol: 'https',
        hostname: process.env.NEXT_PUBLIC_HOST_NAME,
        port: "",
        pathname: '/infrastructure/uploads/**',
      },
    ],
  },

};

export default nextConfig;
