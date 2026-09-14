import path from "node:path";

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
    config.resolve.alias["react-router-dom"] = path.resolve(process.cwd(), "src/lib/router.tsx");
    if (!dev) {
      config.cache = false;
      config.parallelism = 1;
    }
    return config;
  },
};

export default nextConfig;
