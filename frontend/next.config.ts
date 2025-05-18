import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: [
    "172.17.118.10",
    "localhost"
  ],
  reactStrictMode: false,
  output: 'standalone',
};

export default nextConfig;
