@echo off
title Student Tech Hub - Backend Launcher
echo ========================================================
echo   Starting Student Tech Hub Backend Server...
echo ========================================================
echo.
echo Installing requirements (if not already installed)...
pip install -r backend\requirements.txt
echo.
echo Starting FastAPI server at http://127.0.0.1:8000
echo Opening interactive Swagger docs in your browser...
start http://127.0.0.1:8000/docs
start http://127.0.0.1:8000
echo.
echo Press Ctrl+C in this window to stop the server anytime.
echo.
cd backend
python -m uvicorn main:app --reload --host 127.0.0.1 --port 8000
pause
