import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["avatar.vercel.sh","pub-38c830ccf16644ac8c1cd4ad79a3badf.r2.dev"],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'v3.fal.media',
        port: '',
        pathname: '/files/**',
      },
    ],
  },
};

export default nextConfig;
