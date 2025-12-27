@echo off
echo.
echo ========================================
echo   BRIDGE55 DEVELOPMENT SERVER
echo ========================================
echo.
echo Clearing browser cache recommended!
echo.
echo Starting live-server with auto-reload...
echo.
echo Open your browser to:
echo   http://localhost:3000/bridge55-search-hub-FINAL.html
echo.
echo Press Ctrl+C to stop the server
echo ========================================
echo.

cd /d "%~dp0"

:: Check if npm is installed
where npm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo npm not found. Using Python server instead...
    python -m http.server 3000
) else (
    :: Install live-server if not installed
    call npx live-server --port=3000 --no-browser --wait=500
)















