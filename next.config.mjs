/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["images.unsplash.com", "assets.aceternity.com"],
  },
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
