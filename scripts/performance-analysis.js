#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Performance analysis script for Telos web application
function analyzePerformance() {
  console.log('🔍 Analyzing Telos Web Application Performance...\n');

  // Read build output
  const buildPath = path.join(process.cwd(), '.next');
  const standalonePath = path.join(buildPath, 'standalone');

  if (!fs.existsSync(buildPath)) {
    console.log('❌ Build directory not found. Please run "npm run build" first.');
    return;
  }

  // Analyze bundle sizes
  console.log('📦 Bundle Size Analysis:');
  console.log('========================');

  // Check if standalone build exists
  if (fs.existsSync(standalonePath)) {
    console.log('✅ Standalone build created successfully');
    const standaloneSize = getDirectorySize(standalonePath);
    console.log(`📁 Standalone build size: ${formatBytes(standaloneSize)}`);
  }

  // Analyze static files
  const staticPath = path.join(buildPath, 'static');
  if (fs.existsSync(staticPath)) {
    const staticSize = getDirectorySize(staticPath);
    console.log(`📁 Static files size: ${formatBytes(staticSize)}`);
  }

  // Performance recommendations
  console.log('\n💡 Performance Recommendations:');
  console.log('===============================');

  const recommendations = [
    '1. 🖼️  Optimize images: Use WebP/AVIF formats for better compression',
    '2. 📦 Code splitting: Implement dynamic imports for large components',
    '3. 🚀 Use Netlify Edge Functions for faster response times',
    '4. 📊 Monitor Core Web Vitals with Google Analytics',
    '5. 🗜️  Enable Brotli compression on Netlify for better compression',
    '6. 📱 Implement responsive images with next/image',
    "7. ⚡ Use Netlify's built-in CDN for global content delivery",
    '8. 🎯 Preload critical resources using Next.js font optimization',
  ];

  recommendations.forEach(rec => console.log(rec));

  console.log('\n🔗 Useful Links:');
  console.log('================');
  console.log('• Bundle Analyzer: file://.next/analyze/nodejs.html');
  console.log('• Netlify Performance: https://docs.netlify.com/site-deploys/optimize-performance/');
  console.log(
    '• Next.js Optimization: https://nextjs.org/docs/app/building-your-application/optimizing'
  );
}

function getDirectorySize(dirPath) {
  let totalSize = 0;

  function calculateSize(currentPath) {
    const stat = fs.statSync(currentPath);

    if (stat.isDirectory()) {
      const files = fs.readdirSync(currentPath);
      files.forEach(file => {
        calculateSize(path.join(currentPath, file));
      });
    } else {
      totalSize += stat.size;
    }
  }

  calculateSize(dirPath);
  return totalSize;
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Run analysis
analyzePerformance();
