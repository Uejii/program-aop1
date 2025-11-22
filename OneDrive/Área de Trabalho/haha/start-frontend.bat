@echo off
echo ========================================
echo INICIANDO FRONTEND REACT
echo ========================================
echo.
cd frontend
if not exist node_modules (
    echo Instalando dependencias pela primeira vez...
    call npm install
)
npm start
pause

