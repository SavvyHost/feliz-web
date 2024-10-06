/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  transpilePackages: ["@mui/x-date-pickers"],

  // output: "export",

  images: {
    unoptimized: true,
  },
};

export default nextConfig;