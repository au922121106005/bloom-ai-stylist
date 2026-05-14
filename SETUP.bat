@echo off
title Bloom Bouquet Shop Setup

REM ======================================================
REM 🌸 Bloom Bouquet Shop - Full Stack Setup Script
REM ======================================================

echo.
echo ======================================================
echo        🌸 Bloom Bouquet Shop Setup 🌸
echo ======================================================
echo.

REM ======================================================
REM [1/5] Navigate to Backend
REM ======================================================

echo [1/5] Setting up Backend...
cd /d "%~dp0backend"

REM ======================================================
REM Create Virtual Environment
REM ======================================================

if not exist venv (
    echo.
    echo Creating Python virtual environment...
    python -m venv venv
)

REM ======================================================
REM Activate Virtual Environment
REM ======================================================

echo.
echo Activating virtual environment...
call venv\Scripts\activate.bat

REM ======================================================
REM Install Python Dependencies
REM ======================================================

echo.
echo Installing Python dependencies...
pip install -r requirements.txt

REM ======================================================
REM Run Django Migrations
REM ======================================================

echo.
echo Running database migrations...
python manage.py makemigrations
python manage.py migrate --run-syncdb

REM ======================================================
REM Populate Bouquet Products
REM ======================================================

echo.
echo Adding bouquet products to database...
python manage.py populate_bouquets

REM ======================================================
REM Setup Frontend
REM ======================================================

echo.
echo [2/5] Setting up Frontend...
cd /d "%~dp0frontend"

REM ======================================================
REM Check Node.js / npm
REM ======================================================

where npm >nul 2>nul

if errorlevel 1 (
    echo.
    echo ❌ Node.js or npm is not installed.
    echo Please install Node.js from:
    echo https://nodejs.org/
    echo.
    pause
    exit /b
)

REM ======================================================
REM Install Frontend Dependencies
REM ======================================================

echo.
echo Installing frontend dependencies...
call npm install

REM ======================================================
REM Setup Completed
REM ======================================================

echo.
echo ======================================================
echo          ✅ Setup Completed Successfully
echo ======================================================
echo.

echo 🌸 Bloom Bouquet Shop is ready to run!
echo.

echo ================= BACKEND =================
echo cd backend
echo .\venv\Scripts\activate
echo python manage.py runserver
echo.

echo ================= FRONTEND =================
echo cd frontend
echo npm run dev
echo.

echo ======================================================
echo 🌐 Application URLs
echo ======================================================
echo Frontend     : http://localhost:5173
echo Backend API  : http://127.0.0.1:8000/api/products/
echo Admin Panel  : http://127.0.0.1:8000/admin
echo ======================================================
echo.

echo 🌷 Happy Coding & Happy Bouquet Shopping 💐
echo.

pause