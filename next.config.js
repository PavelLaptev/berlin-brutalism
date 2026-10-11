/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Bundle three.js packages so the server build doesn't require() their ESM builds
  transpilePackages: ["three", "@react-three/fiber", "@react-three/drei"],
  // Static export for GitHub Pages; the deploy workflow sets PAGES_BASE_PATH
  output: "export",
  basePath: process.env.PAGES_BASE_PATH || "",
  images: {
    unoptimized: true
  }
};

module.exports = nextConfig;
