# SCM Website - Quick Deploy Script for cPanel
# Usage: .\deploy.ps1

Write-Host ""
Write-Host "╔══════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║   SCM Website — cPanel Deployment Script    ║" -ForegroundColor Cyan
Write-Host "╚══════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

# Step 1: Install dependencies
Write-Host "📦 Step 1/4: Installing dependencies..." -ForegroundColor Yellow
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to install dependencies" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Dependencies installed" -ForegroundColor Green
Write-Host ""

# Step 2: Build production
Write-Host "🔨 Step 2/4: Building production version..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build failed" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Build completed" -ForegroundColor Green
Write-Host ""

# Step 3: Create deployment package
Write-Host "📦 Step 3/4: Creating deployment package..." -ForegroundColor Yellow
$deployFiles = @(
    ".next",
    "public",
    ".env.production",
    "next.config.ts",
    "package.json",
    "package-lock.json",
    "server.js",
    "tsconfig.json"
)

$zipFile = "scmwebsite-deploy.zip"
if (Test-Path $zipFile) {
    Remove-Item $zipFile -Force
}

# Create zip with 7-Zip if available, otherwise use PowerShell
if (Get-Command "7z" -ErrorAction SilentlyContinue) {
    7z a -tzip $zipFile $deployFiles
} else {
    Compress-Archive -Path $deployFiles -DestinationPath $zipFile -Force
}

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to create deployment package" -ForegroundColor Red
    exit 1
}

$fileSize = (Get-Item $zipFile).Length / 1MB
Write-Host "✅ Deployment package created: $zipFile ($([math]::Round($fileSize, 2)) MB)" -ForegroundColor Green
Write-Host ""

# Step 4: Display next steps
Write-Host "✅ Deployment package ready!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Next steps:" -ForegroundColor Cyan
Write-Host "   1. Upload $zipFile to cPanel via File Manager or SCP" -ForegroundColor White
Write-Host "   2. Extract the zip file in your web directory" -ForegroundColor White
Write-Host "   3. Run: npm install --production" -ForegroundColor White
Write-Host "   4. Setup Node.js App in cPanel (see DEPLOYMENT-CPANEL.md)" -ForegroundColor White
Write-Host "   5. Start server: pm2 start server.js --name scmwebsite" -ForegroundColor White
Write-Host ""
Write-Host "📖 Full guide: DEPLOYMENT-CPANEL.md" -ForegroundColor Cyan
Write-Host ""
