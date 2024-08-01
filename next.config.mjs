/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["images.unsplash.com", "assets.aceternity.com"],
  },
  eslint: { ignoreDuringBuilds: true },
  async redirects() {
    return [
      {
        source: "/new-home",
        destination: "/home",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
