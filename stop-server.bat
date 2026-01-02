@echo off
cls
echo ========================================
echo    Stop Server
echo ========================================
echo.

echo [INFO] Stopping server...
echo.

taskkill /F /IM node.exe /FI "WINDOWTITLE eq node*server.js*" 2>nul

if %ERRORLEVEL% EQU 0 (
    echo [OK] Server stopped
) else (
    echo [INFO] No server found running
)

echo.
pause
