@echo off
echo ========================================
echo SISTEMA DE ACADEMIA
echo ========================================
echo.
echo Este script vai abrir 2 janelas:
echo 1. Backend PHP (porta 8000)
echo 2. Frontend React (porta 3000)
echo.
echo Pressione qualquer tecla para continuar...
pause >nul

start "Backend PHP" cmd /k "cd /d %~dp0backend && php -S localhost:8000"

timeout /t 2 /nobreak >nul

start "Frontend React" cmd /k "cd /d %~dp0frontend && if not exist node_modules npm install && npm start"

echo.
echo ========================================
echo Janelas abertas!
echo ========================================
echo.
echo Backend: http://localhost:8000
echo Frontend: http://localhost:3000
echo.
echo Login: admin@academia.com / admin123
echo.
echo Pressione qualquer tecla para fechar este aviso...
pause >nul

