const fs = require('fs');
const path = require('path');

// Paths to config files
const configDir = path.join(__dirname, '../public/admin');
const prodConfigPath = path.join(configDir, 'config.yml');
const devConfigPath = path.join(configDir, 'config.dev.yml');
const activeConfigPath = path.join(configDir, 'config.yml');

// Determine which config to use based on command line arg
const isDev = process.argv.includes('--dev');
const isProd = process.argv.includes('--prod');

if (isDev) {
  // Copy dev config to active config
  console.log('Setting up CMS for local development...');
  fs.copyFileSync(devConfigPath, activeConfigPath);
  console.log('CMS is now set to development mode (test-repo backend).');
  console.log('You can access the CMS at /admin and make changes without authentication.');
} else if (isProd) {
  // Ensure the production config is used
  console.log('Setting up CMS for production...');
  // Copy the original config back (if needed)
  const originalConfig = fs.readFileSync(path.join(configDir, 'config.yml.original'), 'utf8');
  fs.writeFileSync(activeConfigPath, originalConfig);
  console.log('CMS is now set to production mode (git-gateway backend).');
  console.log('Authentication will be required via Netlify Identity.');
} else {
  // If no arguments, create a backup of the original production config if it doesn't exist
  if (!fs.existsSync(path.join(configDir, 'config.yml.original'))) {
    console.log('Creating backup of original production config...');
    fs.copyFileSync(prodConfigPath, path.join(configDir, 'config.yml.original'));
  }

  console.log('Usage:');
  console.log('  node scripts/cms-config.js --dev    # Set CMS to development mode');
  console.log('  node scripts/cms-config.js --prod   # Set CMS to production mode');
}
