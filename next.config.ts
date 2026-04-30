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

// Orchids visual editor — only in local dev, not on Vercel
if (!isVercel) {
  try {
    const path = require("node:path");
    const loaderPath = require.resolve('orchids-visual-edits/loader.js');
    nextConfig = {
      ...nextConfig,
      outputFileTracingRoot: path.resolve(__dirname, '../../'),
      turbopack: {
        rules: {
          "*.tsx": { loaders: [loaderPath], as: "*.tsx" },
          "*.jsx": { loaders: [loaderPath], as: "*.jsx" },
        },
      },
    } as NextConfig;
  } catch {
    // orchids-visual-edits not available, skip
  }
}

export default nextConfig;
