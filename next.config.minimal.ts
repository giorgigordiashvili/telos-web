import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  compiler: {
    styledComponents: true,
  },
  output: 'standalone',
  productionBrowserSourceMaps: false,
  compress: true,
  images: {
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60 * 60 * 24 * 7, // 7 days
  },
};

// Only use bundle analyzer when ANALYZE is true
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
