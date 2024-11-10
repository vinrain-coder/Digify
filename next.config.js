/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "firebasestorage.googleapis.com",
      "m.media-amazon.com",
      "lh3.googleusercontent.com",
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*", // Match all routes
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=60, stale-while-revalidate=30",
          },
        ],
      },
    ];
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
