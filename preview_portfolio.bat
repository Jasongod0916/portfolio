@echo off
setlocal

cd /d "%~dp0"
set "PORT=5500"
set "URL=http://127.0.0.1:%PORT%/"

where python >nul 2>nul
if errorlevel 1 (
  echo Python is not installed or not available in PATH.
  echo Please install Python first, then run this file again.
  pause
  exit /b 1
)

powershell -NoProfile -Command "if (Get-NetTCPConnection -LocalPort %PORT% -ErrorAction SilentlyContinue) { exit 1 } else { exit 0 }"
if errorlevel 1 (
  echo Port %PORT% is already in use.
  echo Opening %URL% in your browser now.
  start "" "%URL%"
  exit /b 0
)

echo Starting local preview server at %URL%
start "Portfolio Preview Server" /D "%~dp0" python -m http.server %PORT% --bind 127.0.0.1

timeout /t 2 /nobreak >nul
start "" "%URL%"

echo Preview server is running.
echo Close the "Portfolio Preview Server" window when you are done.
exit /b 0
