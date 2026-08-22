@echo off
setlocal
cd /d "%~dp0"
powershell -NoProfile -ExecutionPolicy Bypass -File ".\scripts\codex-omniroute.ps1" -Profile "gemini-gemini-2-5-flash"
endlocal
