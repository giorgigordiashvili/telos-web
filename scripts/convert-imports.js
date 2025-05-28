#!/usr/bin/env node

/**
 * Convert @ imports to relative imports for Netlify compatibility
 * This script scans all TypeScript/JavaScript files and converts @ path aliases to relative imports
 */

const fs = require('fs');
const path = require('path');

// Recursively find all TypeScript and JavaScript files
function findFiles(dir, extensions = ['.ts', '.tsx', '.js', '.jsx']) {
  const files = [];
  
  function walkDir(currentDir) {
    const items = fs.readdirSync(currentDir);
    
    for (const item of items) {
      const fullPath = path.join(currentDir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory() && item !== 'node_modules' && item !== '.next') {
        walkDir(fullPath);
      } else if (stat.isFile() && extensions.some(ext => item.endsWith(ext))) {
        files.push(fullPath);
      }
    }
  }
  
  walkDir(dir);
  return files;
}

console.log('🔧 Converting @ imports to relative imports...\n');

const srcDir = path.join(process.cwd(), 'src');
const files = findFiles(srcDir);

let totalFilesProcessed = 0;
let totalImportsConverted = 0;

files.forEach(filePath => {
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Find all @ imports
  const importRegex = /import\s+.*?\s+from\s+['"]@\/([^'"]+)['"]/g;
  let match;
  let hasChanges = false;
  let newContent = content;
  
  while ((match = importRegex.exec(content)) !== null) {
    const importPath = match[1];
    const currentDir = path.dirname(filePath);
    
    // Calculate relative path from current file to the imported file
    const targetPath = path.join(srcDir, importPath);
    const relativePath = path.relative(currentDir, targetPath);
    
    // Ensure the path starts with ./ or ../
    const normalizedRelativePath = relativePath.startsWith('.') 
      ? relativePath.replace(/\\/g, '/') // Convert Windows paths to Unix format
      : `./${relativePath.replace(/\\/g, '/')}`;
    
    // Replace the @ import with relative import
    const oldImport = match[0];
    const newImport = oldImport.replace(`@/${importPath}`, normalizedRelativePath);
    
    newContent = newContent.replace(oldImport, newImport);
    hasChanges = true;
    totalImportsConverted++;
    
    const relativeFilePath = path.relative(process.cwd(), filePath);
    console.log(`  ${relativeFilePath}: @/${importPath} → ${normalizedRelativePath}`);
  }
  
  if (hasChanges) {
    fs.writeFileSync(filePath, newContent, 'utf8');
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
