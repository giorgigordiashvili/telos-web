import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  compiler: {
    styledComponents: true,
    // Remove console logs in production
    removeConsole: process.env.NODE_ENV === 'production',
  },
  output: 'standalone',
  experimental: {
    // Reduce bundle size by optimizing package imports
    optimizePackageImports: ['react-markdown', 'react-hot-toast', 'formik', 'yup'],
    // Enable modern JavaScript output for better performance
    esmExternals: true,
    // Optimize CSS handling
    optimizeCss: true,
  },
  // Disable source maps in production to reduce size
  productionBrowserSourceMaps: false,
  // Compress images automatically
  images: {
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60 * 60 * 24 * 7, // 7 days
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // Enable compression
  compress: true,
  // Optimize fonts
  optimizeFonts: true,
  // Configure webpack for better optimization
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      // Enable tree shaking for better bundle optimization
      config.optimization.usedExports = true;
      config.optimization.sideEffects = false;
      
      // Split chunks for better caching
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
            priority: 10,
          },
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'all',
            priority: 5,
            reuseExistingChunk: true,
          },
        },
      };
    }
    return config;
  },
  // Headers for better caching and security
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
      {
        source: '/images/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

// Only use bundle analyzer when ANALYZE is true and in development
if (process.env.ANALYZE === 'true') {
  try {
    const withBundleAnalyzer = require('@next/bundle-analyzer')({
      enabled: true,
    });
    module.exports = withBundleAnalyzer(nextConfig);
  } catch (error) {
    console.warn('Bundle analyzer not available, proceeding without analysis');
    module.exports = nextConfig;
  }
} else {
  module.exports = nextConfig;
}

export default nextConfig;
