import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true, // Ensures React runs in strict mode for better error detection
  images: {
    domains: [], // Add domains if serving images from an external source
  },
  async headers() {
    return [
      {
        source: "/:path*", // Match all static assets
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable", // Cache for 1 year
          },
        ],
      },
    ];
  },
};

export default nextConfig;
