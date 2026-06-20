@echo off
REM StockSikho Backend Setup Script for Windows

echo 🚀 Setting up StockSikho Backend...
echo.

REM Check Python version
echo ✓ Checking Python version...
python --version

REM Create virtual environment
echo ✓ Creating virtual environment...
python -m venv venv

REM Activate virtual environment
echo ✓ Activating virtual environment...
call venv\Scripts\activate.bat

REM Install dependencies
echo ✓ Installing dependencies...
pip install -r requirements.txt

REM Create .env file if it doesn't exist
if not exist .env (
    echo ✓ Creating .env file...
    copy .env.example .env
    echo ⚠️  Update .env file with your settings (SECRET_KEY, etc.)
)

echo.
echo ✅ Setup complete!
echo.
echo To run the server:
echo   venv\Scripts\activate.bat
echo   python app.py
echo.
echo Server will run at http://localhost:5000
pause
