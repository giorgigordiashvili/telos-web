#!/bin/bash

echo "🚀 Starting optimized Netlify build..."

# Set production environment
export NODE_ENV=production
export NEXT_TELEMETRY_DISABLED=1

# Configure CMS for production
echo "📝 Setting up CMS for production..."
node scripts/cms-config.js --prod

# Clean previous builds
echo "🧹 Cleaning previous builds..."
rm -rf .next

# Install dependencies with clean slate
echo "📦 Installing dependencies..."
npm ci

# Build the application
echo "🔨 Building application..."
npm run build

# Remove unnecessary files from standalone build to reduce size
echo "🗑️  Optimizing build size..."

# Remove development dependencies from standalone
if [ -d ".next/standalone/node_modules" ]; then
    echo "  - Removing dev dependencies from standalone..."
    cd .next/standalone
    npm prune --production
    cd ../..
fi

# Remove unnecessary files
echo "  - Removing unnecessary files..."
find .next/standalone -name "*.md" -delete
find .next/standalone -name "*.txt" -delete  
find .next/standalone -name "CHANGELOG*" -delete
find .next/standalone -name "LICENSE*" -delete
find .next/standalone -name "README*" -delete
find .next/standalone -name "*.map" -delete

# Remove cache and build artifacts that aren't needed
rm -rf .next/cache
rm -rf .next/analyze

# Show final build size
echo "📊 Final build sizes:"
du -sh .next/
du -sh .next/standalone/

echo "✅ Build optimization complete!"
