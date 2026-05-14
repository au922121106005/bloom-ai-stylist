@echo off
title Bloom Bouquet Shop Launcher

REM ======================================================
REM 🌸 Bloom Bouquet Shop - Project Launcher
REM ======================================================

echo.
echo ======================================================
echo        🌸 Bloom Bouquet Shop Launcher 🌸
echo ======================================================
echo.

REM ======================================================
REM Start Backend Server
REM ======================================================

echo [1/2] Starting Django Backend...

start powershell -NoExit -Command ^
"cd '%~dp0backend'; ^
.\venv\Scripts\Activate.ps1; ^
Write-Host ''; ^
Write-Host '🌸 Virtual Environment Activated' -ForegroundColor Green; ^
Write-Host '⚙️ Starting Django Backend Server...' -ForegroundColor Cyan; ^
python manage.py runserver"

REM ======================================================
REM Small Delay
REM ======================================================

timeout /t 3 /nobreak >nul

REM ======================================================
REM Start Frontend Server
REM ======================================================

echo [2/2] Starting React Frontend...

start powershell -NoExit -Command ^
"cd '%~dp0frontend'; ^
Write-Host ''; ^
Write-Host '🌐 Starting React + Vite Frontend...' -ForegroundColor Magenta; ^
npm run dev"

REM ======================================================
REM Final Message
REM ======================================================

echo.
echo ======================================================
echo           ✅ Bloom Bouquet Shop Started
echo ======================================================
echo.

echo 🌐 Frontend:
echo http://localhost:5173
echo.

echo ⚙️ Backend API:
echo http://127.0.0.1:8000/api/products/
echo.

echo 👨‍💼 Admin Panel:
echo http://127.0.0.1:8000/admin
echo.

echo 🌷 Happy Coding & Happy Bouquet Shopping 💐
echo.