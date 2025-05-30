#!/bin/bash

# Kill any existing processes
echo "Stopping existing processes..."
pkill -f "astro dev" || true
pkill -f "tinacms dev" || true

# Wait a moment for processes to clean up
sleep 2

# Start TinaCMS dev server
echo "Starting TinaCMS dev server on port 4001..."
npx tinacms dev -c "astro dev" &

# Wait for servers to start
echo "Waiting for servers to start..."
sleep 5

# Check if servers are running
echo "Checking server status..."
lsof -i :4321 -i :4001

echo ""
echo "Servers should be running!"
echo "TinaCMS admin: http://localhost:4321/admin/index.html"
echo "Astro site: http://localhost:4321/"