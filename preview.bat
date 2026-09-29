@echo off
REM Double-click to preview the portfolio on your own computer.
REM Keep this window open while you look at the site. Close it to stop.
cd /d "%~dp0"
echo.
echo  Portfolio preview running at http://localhost:8000
echo  Refresh the browser (Ctrl+F5) after each edit. Close this window to stop.
echo.
start "" http://localhost:8000
python -m http.server 8000
