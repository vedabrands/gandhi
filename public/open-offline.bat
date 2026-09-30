@echo off
setlocal
cd /d "%~dp0"
echo =====================================================================
echo   MAHATMA GANDHI JAYANTI - 21ST CENTURY INQUIRY (OFFLINE RUNNER)
echo =====================================================================
echo.
echo Launching presentation in your default browser...

where python >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    start "" "http://localhost:8080"
    python -m http.server 8080
    goto end
)

where py >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    start "" "http://localhost:8080"
    py -m http.server 8080
    goto end
)

where npx >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    start "" "http://localhost:8080"
    npx --yes serve -l 8080 .
    goto end
)

start "" "%~dp0index.html"

:end
