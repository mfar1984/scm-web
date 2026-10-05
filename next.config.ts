import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  
  reactStrictMode: true,
  
  // Output standalone for cPanel deployment
  output: 'standalone',
  
  // Disable image optimization for cPanel (shared hosting limitation)
  images: {
    unoptimized: true,
  },

  // Limit build workers: the cPanel host reports 128 CPUs and one worker
  // per CPU gets `next build` killed by the account memory limit.
  experimental: {
    cpus: 1,
  },
  
  // CORS headers for all routes
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*'
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, OPTIONS'
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, Authorization, X-Requested-With'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          }
        ]
      }
    ]
  }
};

export default nextConfig;
