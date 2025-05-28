# Netlify Deployment Troubleshooting Guide

## 🚨 Common Issues and Solutions

### Issue 1: Module Resolution - `Can't resolve '@/...'`

**Symptoms:**
```
Module not found: Can't resolve '@/components/...'
Module not found: Can't resolve '@/lib/...'
Module not found: Can't resolve '@/screens/...'
```

**Root Cause:**
Netlify's build environment sometimes doesn't properly resolve TypeScript path mapping, even when it works locally.

**Solutions (in order of preference):**

#### Solution A: Enhanced TypeScript Configuration (Preferred)
Current configuration should work, but if it doesn't:

1. Ensure `.nvmrc` file exists with Node version 18
2. Verify `next.config.ts` has explicit webpack alias configuration
3. Check that `baseUrl: "."` is set in `tsconfig.json`

#### Solution B: Use Fallback Build Command
If the main build fails, use the fallback that converts @ imports to relative:

```bash
# In Netlify build settings, change build command to:
npm run build:netlify-fallback
```

This will:
1. Run CMS configuration
2. Convert all @ imports to relative imports
3. Run the production build

#### Solution C: Manual Import Conversion
Run the conversion script locally and commit the changes:

```bash
node scripts/convert-imports.js
git add .
git commit -m "Convert @ imports to relative imports for Netlify"
```

### Issue 2: Build Environment Configuration

**Ensure these environment variables are set in Netlify:**

```toml
[build.environment]
NODE_VERSION = "18"
NODE_ENV = "production"
NODE_OPTIONS = "--max-old-space-size=4096"
NEXT_TELEMETRY_DISABLED = "1"
TYPESCRIPT_PATHS = "true"
```

### Issue 3: Next.js Plugin Configuration

**Ensure the Netlify Next.js plugin is properly configured:**

```toml
[[plugins]]
package = "@netlify/plugin-nextjs"
```

### Issue 4: File Case Sensitivity

Netlify's Linux environment is case-sensitive. Ensure:
- All file imports match exact case
- Component names match file names exactly
- Directory names are consistent

## 🔧 Debugging Steps

### Step 1: Check Local Build
```bash
npm run build:prod
```
If this fails locally, fix local issues first.

### Step 2: Test Import Conversion
```bash
node scripts/convert-imports.js
npm run build:prod
```

### Step 3: Check TypeScript Compilation
```bash
npx tsc --noEmit
```

### Step 4: Verify File Structure
Ensure all imported files exist in the correct locations:
- `src/components/` - All component files
- `src/screens/` - All screen components
- `src/lib/` - Utility and content files
- `src/icons/` - Icon components

## 📝 Build Commands Reference

### Available Build Scripts
```json
{
  "build": "next build",
  "build:prod": "NODE_ENV=production next build",
  "build:analyze": "ANALYZE=true NODE_ENV=production next build",
  "build:netlify": "npm run cms:prod && npm run build:prod",
  "build:netlify-fallback": "npm run cms:prod && node scripts/convert-imports.js && npm run build:prod"
}
```

### Recommended Netlify Build Settings
```
Build command: npm run build:netlify
Publish directory: .next
Functions directory: netlify/functions
```

## 🚀 Quick Fix Checklist

When deployment fails with module resolution errors:

1. ✅ Check if `.nvmrc` exists (Node 18)
2. ✅ Verify `next.config.ts` has path resolution
3. ✅ Confirm `tsconfig.json` has `baseUrl: "."`
4. ✅ Ensure Netlify plugin is configured
5. ✅ Try fallback build command: `build:netlify-fallback`
6. ✅ Check file case sensitivity
7. ✅ Verify all imported files exist

## 📊 Performance Optimization

After successful deployment:

1. **Monitor Bundle Size**: Use `npm run build:analyze`
2. **Check Performance**: Use `npm run perf`
3. **Review Reports**: Check `.next/analyze/` directory
4. **Optimize Images**: Convert to WebP/AVIF formats
5. **Enable Caching**: Verify cache headers in production

## 🔄 Rollback Strategy

If the import conversion breaks local development:

1. **Restore from Git**: `git checkout -- src/`
2. **Use Branch Strategy**: Keep converted imports in a separate branch
3. **Conditional Imports**: Use environment-based import resolution

## 📞 Support Resources

- [Next.js Module Resolution](https://nextjs.org/docs/app/api-reference/next-config-js/webpack)
- [Netlify Next.js Plugin](https://github.com/netlify/netlify-plugin-nextjs)
- [TypeScript Path Mapping](https://www.typescriptlang.org/docs/handbook/module-resolution.html)
- [Webpack Resolve Alias](https://webpack.js.org/configuration/resolve/#resolvealias)

---

**Last Updated**: 2025-05-28
**Build Status**: Ready for deployment with fallback options
**Optimization Level**: High (console removal, tree shaking, compression)
