/** @type {import('next').NextConfig} */
const nextConfig = {
  // ensure builds skip lint/types entirely
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
};
module.exports = nextConfig;
