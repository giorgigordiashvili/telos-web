#!/bin/bash

# Start the Netlify CMS proxy server in the background
echo "Starting Netlify CMS proxy server..."
npx netlify-cms-proxy-server &
PROXY_PID=$!

# Wait a moment for proxy server to start
sleep 2

# Start Next.js dev server
echo "Starting Next.js development server..."
npm run dev

# Clean up the proxy server when Next.js is terminated
kill $PROXY_PID
