#!/bin/bash
# StockSikho Backend Setup Script

echo "🚀 Setting up StockSikho Backend..."
echo ""

# Check Python version
echo "✓ Checking Python version..."
python --version

# Create virtual environment
echo "✓ Creating virtual environment..."
python -m venv venv

# Activate virtual environment
echo "✓ Activating virtual environment..."
source venv/bin/activate

# Install dependencies
echo "✓ Installing dependencies..."
pip install -r requirements.txt

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "✓ Creating .env file..."
    cp .env.example .env
    echo "⚠️  Update .env file with your settings (SECRET_KEY, etc.)"
fi

echo ""
echo "✅ Setup complete!"
echo ""
echo "To run the server:"
echo "  source venv/bin/activate"
echo "  python app.py"
echo ""
echo "Server will run at http://localhost:5000"
