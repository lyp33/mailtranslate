@echo off
cls
echo ========================================
echo    Quick Start
echo ========================================
echo.

where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Node.js not found
    echo.
    echo Installing Node.js...
    start https://nodejs.org/
    echo.
    echo Please install Node.js and run again
    pause
    exit /b 1
)

echo [OK] Node.js:
node --version
echo.

if not exist "server.js" (
    echo [ERROR] server.js not found
    pause
    exit /b 1
)

echo Starting server...
node server.js
