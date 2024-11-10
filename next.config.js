/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "firebasestorage.googleapis.com",
      "m.media-amazon.com",
      "lh3.googleusercontent.com",
    ],
  },
  // Commented out experimental feature
  // experimental: {
  //   staleTimes: {
  //     dynamic: 60,
  //   },
  // },

  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
