@echo off
REM Double-click to put your edits live on https://laveeza-fatima.github.io
cd /d "%~dp0"
echo.
echo  Files you changed:
git status --short
echo.
set /p msg=Describe your change (e.g. Added new project) and press Enter:
if "%msg%"=="" set msg=Update portfolio
git add -A
git commit -m "%msg%"
git pull --rebase
git push
echo.
echo  Done. The live site updates in about 1-2 minutes: https://laveeza-fatima.github.io
echo  (Press Ctrl+F5 on the site if you still see the old version.)
echo.
pause
