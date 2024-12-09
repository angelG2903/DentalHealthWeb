/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true, // Desactiva la optimización de imágenes
    disableStaticImages: true, // Deshabilita la optimización de imágenes locales
  },
};

export default nextConfig;
