# FluxTrail Installation Script (Windows)

Write-Host "🚀 Preparing to install FluxTrail..." -ForegroundColor Cyan

# Check for Node.js
if (Get-Command node -ErrorAction SilentlyContinue) {
    $nodeVer = node -v
    Write-Host "✅ Node.js detected: $nodeVer" -ForegroundColor Green
} else {
    Write-Host "✘ Node.js not found. Please install it from https://nodejs.org/" -ForegroundColor Red
    exit 1
}

# Check for npm
if (Get-Command npm -ErrorAction SilentlyContinue) {
    Write-Host "✅ npm detected." -ForegroundColor Green
} else {
    Write-Host "✘ npm not found." -ForegroundColor Red
    exit 1
}

Write-Host "`nFluxTrail is an open-source, local-first context manager."
Write-Host "This script will install the 'fluxtrail' command globally using npm.`n"

$confirm = Read-Host "Proceed with installation? (y/n)"
if ($confirm -ne 'y') {
    Write-Host "Installation cancelled."
    exit 0
}

Write-Host "Installing fluxtrail..."
npm install -g @mediaflux/fluxtrail

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n✨ FluxTrail installed successfully!" -ForegroundColor Green
    Write-Host "Run 'fluxtrail doctor' to check your full environment."
} else {
    Write-Host "`n✘ Installation failed." -ForegroundColor Red
}
