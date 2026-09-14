import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "smru.edu.in",
        port: "",
        pathname: "/assets/Logo.webp",
        search: "",
      },
    ],
  },
};

export default nextConfig;
