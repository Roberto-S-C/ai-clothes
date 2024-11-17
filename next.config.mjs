/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "5251",
        pathname: "/images/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "5251",
        pathname: "/piece/**",
      },
    ],
  },
};

export default nextConfig;
