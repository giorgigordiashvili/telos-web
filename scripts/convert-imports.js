#!/usr/bin/env node

/**
 * Convert @ imports to relative imports for Netlify compatibility
 * This script scans all TypeScript/JavaScript files and converts @ path aliases to relative imports
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Get all TypeScript and JavaScript files in src directory
const files = glob.sync('src/**/*.{ts,tsx,js,jsx}', { cwd: process.cwd() });

console.log('🔧 Converting @ imports to relative imports...\n');

let totalFilesProcessed = 0;
let totalImportsConverted = 0;

files.forEach(filePath => {
  const fullPath = path.join(process.cwd(), filePath);
  const content = fs.readFileSync(fullPath, 'utf8');

  // Find all @ imports
  const importRegex = /import\s+.*?\s+from\s+['"]@\/([^'"]+)['"]/g;
  let match;
  let hasChanges = false;
  let newContent = content;

  while ((match = importRegex.exec(content)) !== null) {
    const importPath = match[1];
    const currentDir = path.dirname(filePath);

    // Calculate relative path from current file to the imported file
    const targetPath = path.join('src', importPath);
    const relativePath = path.relative(currentDir, targetPath);

    // Ensure the path starts with ./ or ../
    const normalizedRelativePath = relativePath.startsWith('.')
      ? relativePath
      : `./${relativePath}`;

    // Replace the @ import with relative import
    const oldImport = match[0];
    const newImport = oldImport.replace(`@/${importPath}`, normalizedRelativePath);

    newContent = newContent.replace(oldImport, newImport);
    hasChanges = true;
    totalImportsConverted++;

    console.log(`  ${filePath}: @/${importPath} → ${normalizedRelativePath}`);
  }

  if (hasChanges) {
    fs.writeFileSync(fullPath, newContent, 'utf8');
    totalFilesProcessed++;
  }
});

console.log(`\n✅ Conversion complete!`);
console.log(`📁 Files processed: ${totalFilesProcessed}`);
console.log(`🔄 Imports converted: ${totalImportsConverted}`);

if (totalImportsConverted === 0) {
  console.log('ℹ️  No @ imports found to convert.');
} else {
  console.log('\n⚠️  Note: This is a temporary fix for Netlify deployment.');
  console.log('   You may want to revert these changes for local development.');
}
