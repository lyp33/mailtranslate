@echo off
cls
echo ========================================
echo    Outlook Translator - Start Server
echo ========================================
echo.

REM Check Node.js
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Node.js not found
    echo.
    echo Please install Node.js:
    echo 1. Visit https://nodejs.org/
    echo 2. Download and install LTS version
    echo 3. Run this script again
    echo.
    pause
    exit /b 1
)

echo [OK] Node.js installed
node --version
echo.

if not exist "server.js" (
    echo [ERROR] server.js not found
    pause
    exit /b 1
)

echo [OK] server.js found
echo.
echo [OK] Starting server...
echo.
echo ========================================
echo   Server: http://localhost:3000
echo   Press Ctrl+C to stop
echo ========================================
echo.

node server.js
