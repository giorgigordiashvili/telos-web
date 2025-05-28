# Netlify Deployment Optimization

This document outlines the optimizations made to reduce the bundle size for Netlify deployment.

## Problem

The build was exceeding Netlify's 250MB function size limit due to:

- Large standalone build (274MB)
- Including unnecessary files in the deployment
- Unoptimized Next.js configuration

## Solutions Implemented

### 1. Next.js Configuration Optimization (`next.config.ts`)

- Enabled `optimizePackageImports` for key dependencies
- Disabled production source maps to reduce size
- Enabled SWC minification
- Configured output file tracing

### 2. Custom Build Script (`scripts/build-netlify.sh`)

- Removes development dependencies from standalone build
- Cleans unnecessary files (README, LICENSE, CHANGELOG, etc.)
- Removes source maps and cache files
- Provides build size reporting

### 3. Netlify Configuration (`netlify.toml`)

- Optimized build command to use custom script
- Configured function file exclusions
- Set proper environment variables
- Added caching headers for performance

### 4. Dependencies Review

The following large dependencies were identified:

- `next` (27MB) - Required
- `@img` (15MB) - Image optimization package
- `caniuse-lite` (2.4MB) - Browser compatibility data
- `react-dom` (1.7MB) - Required

## Deployment Instructions

1. **Update Netlify Build Settings:**

   - Build command: `npm run build:netlify`
   - Publish directory: `.next`

2. **Environment Variables (if needed):**

   ```
   NODE_ENV=production
   NEXT_TELEMETRY_DISABLED=1
   NODE_OPTIONS=--max-old-space-size=4096
   ```

3. **Monitor Build Size:**
   ```bash
   npm run build:netlify
   du -sh .next/standalone/
   ```

## Expected Results

- Build size should be under 200MB
- Faster build times
- Better performance on Netlify

## Troubleshooting

If you still encounter size issues:

1. **Remove unused dependencies:**

   ```bash
   npm ls
   npm uninstall [unused-package]
   ```

2. **Use bundle analyzer:**

   ```bash
   npm run analyze
   ```

3. **Consider static export:**
   Add `output: 'export'` to `next.config.ts` if you don't need server-side features.

4. **Move large assets to CDN:**
   Consider moving large images/files to external CDN storage.
