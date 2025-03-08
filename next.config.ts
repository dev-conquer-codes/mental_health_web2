import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    HUME_API_KEY: process.env.HUME_API_KEY,
    HUME_SECRET_KEY: process.env.HUME_SECRET_KEY,
  },
};

export default nextConfig;
