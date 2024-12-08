/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    
    disableStaticImages: true, // Deshabilita la optimización de imágenes locales
    remotePatterns: [
      {
        protocol: process.env.NEXT_PUBLIC_PROTOCOL,
        hostname: process.env.NEXT_PUBLIC_HOST_NAME,
        port: process.env.NEXT_PUBLIC_PORT || "",
        pathname: '/infrastructure/uploads/**',
      },
    ],
  },

};

export default nextConfig;
