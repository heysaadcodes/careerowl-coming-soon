/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: {
      root: "./", // explicitly tell Next.js your project root
    },
  },
};

export default nextConfig;
