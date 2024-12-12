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
        protocol: "https",
        hostname: "aiclothes.shop",
        port: "5000",
        pathname: "/images/**",
      },
      {
        protocol: "https",
        hostname: "aiclothes.shop",
        port: "5000",
        pathname: "/piece/**",
      },
    ],
  },
};

export default nextConfig;
