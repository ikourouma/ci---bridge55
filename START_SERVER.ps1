# Bridge55 Local Development Server
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  BRIDGE55 LOCAL DEVELOPMENT SERVER" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Starting server on http://localhost:8080" -ForegroundColor Green
Write-Host ""
Write-Host "Open your browser and go to:" -ForegroundColor Yellow
Write-Host ""
Write-Host "  http://localhost:8080/bridge55-search-hub-FINAL.html" -ForegroundColor White
Write-Host ""
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Red
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Change to script directory
Set-Location $PSScriptRoot

# Start Python HTTP Server
python -m http.server 8080
















