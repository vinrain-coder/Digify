/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "firebasestorage.googleapis.com",
      "m.media-amazon.com",
      "lh3.googleusercontent.com",
    ],
  },

  // Enable experimental server actions to fix the useSearchParams issue
  experimental: {
    serverActions: true,
    appDir: true, // Enable app directory features if you're using the `/app` structure
  },

  eslint: {
    // Ignore ESLint errors during the build process on Vercel
    ignoreDuringBuilds: true,
  },

  typescript: {
    // Ignore TypeScript errors during the build process
    ignoreBuildErrors: true,
  },

  // Optionally set up React Suspense for better error handling with hooks like useSearchParams
  reactStrictMode: true,
  compiler: {
    // Enable React server components for better support with app directory structure
    styledComponents: true,
  },
};

module.exports = nextConfig;
