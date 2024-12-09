/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Referrer-Policy",
            value: "no-referrer-when-downgrade",
          },
        ],
      },
    ];
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "24.199.69.20",
        port: "5000",
        pathname: "/images/**",
      },
      {
        protocol: "http",
        hostname: "24.199.69.20",
        port: "5000",
        pathname: "/piece/**",
      },
    ],
  },
};

export default nextConfig;
