/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '192.168.100.23',
        port: '5000',
        pathname: '/infrastructure/uploads/**',
      },
    ],
  },

};

export default nextConfig;
