#!/bin/bash

# vercel-build.sh
# Custom build script for Vercel deployment

echo "Starting the build process..."

# Ensure the script stops on first error
set -e

# If needed, you can add commands here to manipulate config-override.js or perform other pre-build steps

# Use react-app-rewired to apply the custom configuration from config-override.js
npx react-app-rewired build

echo "Build process completed."
