#!/bin/bash

# FluxTrail Installation Script (Linux/macOS)

echo -e "\033[0;36m🚀 Preparing to install FluxTrail...\033[0m"

# Check for Node.js
if command -v node >/dev/null 2>&1; then
    nodeVer=$(node -v)
    echo -e "\033[0;32m✅ Node.js detected: $nodeVer\033[0m"
else
    echo -e "\033[0;31m✘ Node.js not found. Please install it from https://nodejs.org/\033[0m"
    exit 1
fi

# Check for npm
if command -v npm >/dev/null 2>&1; then
    echo -e "\033[0;32m✅ npm detected.\033[0m"
else
    echo -e "\033[0;31m✘ npm not found.\033[0m"
    exit 1
fi

echo -e "\nFluxTrail is an open-source, local-first context manager."
echo -e "This script will install the 'fluxtrail' command globally using npm.\n"

read -p "Proceed with installation? (y/n) " confirm
if [[ $confirm != "y" ]]; then
    echo "Installation cancelled."
    exit 0
fi

echo "Installing fluxtrail..."
sudo npm install -g @mediaflux-in/fluxtrail

if [ $? -eq 0 ]; then
    echo -e "\n\033[0;32m✨ FluxTrail installed successfully!\033[0m"
    echo "Run 'fluxtrail doctor' to check your full environment."
else
    echo -e "\n\033[0;31m✘ Installation failed.\033[0m"
fi
