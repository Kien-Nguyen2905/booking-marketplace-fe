import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      'a0.muscache.com',
      'cf.bstatic.com',
      'images.unsplash.com',
      'plus.unsplash.com',
      'totp',
      'booking-marketplace.s3.ap-southeast-1.amazonaws.com',
      'qr.sepay.vn',
    ],
  },
};

export default nextConfig;
