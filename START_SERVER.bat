@echo off
echo.
echo ========================================
echo   BRIDGE55 LOCAL DEVELOPMENT SERVER
echo ========================================
echo.
echo Starting server on http://localhost:8080
echo.
echo Open your browser and go to:
echo.
echo   http://localhost:8080/bridge55-search-hub-FINAL.html
echo.
echo Press Ctrl+C to stop the server
echo ========================================
echo.

cd /d "%~dp0"
python -m http.server 8080















