/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  experimental: {
    optimizePackageImports: ["react-icons"],
  },
  compress: true,
  distDir: process.env.NODE_ENV === "development" ? ".next-dev" : ".next",
  webpack: (config, { dev }) => {
    if (!dev) {
      config.cache = false;
      config.parallelism = 1;
    }
    // Importing one icon from src/components/icons must not bring in the other 170.
    config.module.rules.push({ test: /[\\/]src[\\/]components[\\/]icons[\\/]/, sideEffects: false });
    return config;
  },
};

export default nextConfig;
