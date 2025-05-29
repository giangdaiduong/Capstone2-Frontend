import type { NextConfig } from 'next';
import linkTo from '@/utils/linkTo';

const nextConfig: NextConfig = {
  redirects: async () => [
    {
      source: linkTo.admin.base,
      destination: linkTo.admin.dashboard,
      permanent: true,
      locale: false,
    },
    {
      source: linkTo.investor.base,
      destination: linkTo.investor.listIdea,
      permanent: true,
      locale: false,
    },
  ],

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: '**',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
