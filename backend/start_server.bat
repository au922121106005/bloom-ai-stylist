@echo off
echo ========================================
echo Starting Bloom Backend Server...
echo ========================================
cd /d "%~dp0"
echo.
echo Installing dependencies if needed...
npm install
echo.
echo Starting server on http://localhost:5000
echo.
node server.js
pause