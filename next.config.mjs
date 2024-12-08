/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "0000",
        port: "5000",
        pathname: "/images/**",
      },
      {
        protocol: "http",
        hostname: "0000",
        port: "5000",
        pathname: "/piece/**",
      },
    ],
  },
};

export default nextConfig;
