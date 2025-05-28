import type { NextConfig } from 'next';
import linkTo from '@/utils/linkTo';

const nextConfig: NextConfig = {
  redirects: async () => {
    return [
      {
        source: linkTo.admin.base,
        destination: linkTo.admin.dashboard,
        permanent: true,
        locale: false,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'images2.thanhnien.vn',
      },
    ],
  },
};

export default nextConfig;
