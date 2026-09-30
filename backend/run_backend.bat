@echo off
title Student Tech Hub - Backend
echo ========================================================
echo   Starting Student Tech Hub Backend Server...
echo ========================================================
echo.
pip install -r requirements.txt
echo.
echo Starting FastAPI server at http://127.0.0.1:8000
echo Opening Swagger documentation in your browser...
start http://127.0.0.1:8000/docs
echo.
python -m uvicorn main:app --reload --host 127.0.0.1 --port 8000
pause
