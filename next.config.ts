import type { NextConfig } from "next";

const isVercel = !!process.env.VERCEL;

let nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
      { protocol: 'http',  hostname: '**' },
    ],
  },
  typescript:  { ignoreBuildErrors: true },
  eslint:      { ignoreDuringBuilds: true },
};

// Orchids visual editor config intentionally removed for stability

export default nextConfig;
