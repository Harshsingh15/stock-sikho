# StockSikho - Full Stack Deployment Guide

## Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                    VERCEL (Frontend)                    │
│              stock-simulator.html + api-client.js       │
└──────────────────────┬──────────────────────────────────┘
                       │ API Calls
                       │ (HTTP/CORS)
                       ↓
┌─────────────────────────────────────────────────────────┐
│         RENDER / RAILWAY (Python Backend)               │
│              Flask API with JWT Auth                    │
└──────────────────────┬──────────────────────────────────┘
                       │
                       ↓
┌─────────────────────────────────────────────────────────┐
│              users_db.xlsx (Excel Database)             │
│        - Users (credentials & wallet balance)           │
│        - Transactions (buy/sell history)                │
│        - Portfolio (holdings & positions)               │
└─────────────────────────────────────────────────────────┘
```

## Prerequisites

- Python 3.8+
- Node.js (for Vercel CLI)
- Git
- Render or Railway account
- Vercel account

---

## Step 1: Local Development Setup

### 1.1 Clone/Organize Your Project

```
stock/
├── stock-simulator.html       # Frontend
├── api-client.js              # API Client Library
└── backend/
    ├── app.py                 # Flask server
    ├── requirements.txt       # Python dependencies
    ├── render.yaml            # Render deployment config
    ├── Procfile               # Railway/Heroku deployment config
    └── .env.example           # Environment variables template
```

### 1.2 Set Up Backend Locally

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file (copy from .env.example)
cp .env.example .env

# Run the server
python app.py
```

Server will run at `http://localhost:5000`

### 1.3 Update Frontend to Use Backend

In your `stock-simulator.html`, add this in the `<head>` section:

```html
<script src="api-client.js"></script>
```

Then in your JavaScript code, initialize the API client:

```javascript
// Initialize API client
const API = new StockSikhoAPI('http://localhost:5000');

// When registering:
async function handleRegister(username, email, password) {
  try {
    const response = await API.register(username, email, password);
    console.log('Registered:', response);
    // Update your UI
  } catch (error) {
    console.error('Registration failed:', error);
  }
}

// When logging in:
async function handleLogin(username, password) {
  try {
    const response = await API.login(username, password);
    console.log('Logged in:', response);
    // Update your UI
  } catch (error) {
    console.error('Login failed:', error);
  }
}

// Buying stocks:
async function handleBuyStock(symbol, quantity, price) {
  try {
    const response = await API.buyStock(symbol, quantity, price);
    console.log('Purchase successful:', response);
    // Update your UI
  } catch (error) {
    console.error('Purchase failed:', error);
  }
}
```

---

## Step 2: Deploy Backend on Render (Recommended - Free Tier)

### 2.1 Create Render Account
- Go to https://render.com
- Sign up with GitHub (recommended)

### 2.2 Connect Repository
- Push your code to GitHub:
  ```bash
  git init
  git add .
  git commit -m "Initial commit"
  git branch -M main
  git remote add origin https://github.com/yourusername/stock-simulator.git
  git push -u origin main
  ```

### 2.3 Deploy on Render
1. Go to Render dashboard
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: `stocksikho-backend`
   - **Environment**: Python 3
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn app:app`
   - **Plan**: Free

5. Add Environment Variables:
   - `FLASK_ENV`: `production`
   - `SECRET_KEY`: (generate a random string)

6. Click "Create Web Service"
7. Wait for deployment (2-5 minutes)
8. Copy your backend URL (e.g., `https://stocksikho-backend.onrender.com`)

### 2.4 Alternative: Deploy on Railway
- Go to https://railway.app
- Click "New Project" → "Deploy from GitHub"
- Connect your repository
- Railway auto-detects Python and uses Procfile
- Add environment variables in Settings
- Deploy with one click

---

## Step 3: Deploy Frontend on Vercel

### 3.1 Create Vercel Account
- Go to https://vercel.com
- Sign up with GitHub

### 3.2 Update Frontend for Production Backend

In your HTML file, update the API initialization:

```javascript
// Detect environment
const API_BASE_URL = window.location.hostname === 'localhost'
  ? 'http://localhost:5000'
  : 'https://stocksikho-backend.onrender.com'; // Replace with your Render URL

const API = new StockSikhoAPI(API_BASE_URL);
```

### 3.3 Deploy on Vercel
1. Push your code to GitHub (frontend only, or the whole repo)
2. Go to Vercel dashboard
3. Click "Add New..." → "Project"
4. Import your GitHub repository
5. Configure:
   - **Framework**: Other
   - **Root Directory**: `./` (or `.` if only HTML)
   - **Build Command**: (leave empty)
   - **Output Directory**: (leave empty)

6. Click "Deploy"
7. Copy your frontend URL (e.g., `https://stocksikho.vercel.app`)

---

## Step 4: Connect Everything

### 4.1 Enable CORS on Backend

The backend already has CORS enabled, but update if needed:

In `backend/app.py`:
```python
CORS(app, origins=['https://stocksikho.vercel.app', 'http://localhost:3000'])
```

Then redeploy backend.

### 4.2 Test the Connection

1. Go to your Vercel frontend URL
2. Open browser console (F12)
3. Try registering/logging in
4. Check if it works with the backend

---

## Step 5: Excel Database Management

### 5.1 Database Structure

**Users Sheet**:
- Column A: Username
- Column B: Email
- Column C: Password (hashed)
- Column D: Wallet Balance
- Column E: Total Invested
- Column F: Created At

**Transactions Sheet**:
- Column A: Username
- Column B: Action (BUY/SELL)
- Column C: Stock Symbol
- Column D: Quantity
- Column E: Price
- Column F: Total
- Column G: Timestamp

**Portfolio Sheet**:
- Column A: Username
- Column B: Stock Symbol
- Column C: Quantity
- Column D: Average Buy Price
- Column E: Current Value

### 5.2 Download/Backup Database

The Excel file is created automatically on first run: `users_db.xlsx`

To backup:
```bash
# On Render, you need to enable persistent storage or use backup
# For now, download manually from Render file system
```

### 5.3 Upgrade to Database Service (Future)

When ready to scale, consider:
- **SQLite** (simple, file-based)
- **PostgreSQL** (scalable, free tier on Railway/Render)
- **MongoDB** (cloud-native)

---

## Step 6: API Endpoints Reference

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### User
- `GET /api/user/profile` - Get user profile (requires token)
- `GET /api/user/portfolio` - Get user portfolio (requires token)
- `GET /api/user/transactions` - Get user transactions (requires token)

### Trading
- `POST /api/trade/buy` - Buy stocks (requires token)
- `POST /api/trade/sell` - Sell stocks (requires token)

### Utility
- `GET /api/health` - Health check

---

## Step 7: Environment Variables

### Backend (.env)

```env
FLASK_ENV=production
SECRET_KEY=your-super-secret-key-min-32-chars
PORT=5000
```

### Frontend (in HTML)

```javascript
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://your-backend.onrender.com';
const API = new StockSikhoAPI(API_BASE_URL);
```

---

## Troubleshooting

### CORS Errors
- Make sure backend has `Flask-CORS` installed
- Check that frontend URL is in CORS allowed origins
- Clear browser cache (Ctrl+Shift+Delete)

### 401 Unauthorized
- Token might be expired (24 hours)
- User might not be logged in
- Check localStorage for token: `console.log(localStorage.getItem('token'))`

### 404 User Not Found
- Make sure user is registered before login
- Check username spelling (case-sensitive)

### Database Errors
- Make sure `openpyxl` is installed
- Check file permissions on server
- Excel file should be in the same directory as app.py

### Deployment Issues
- Check Render/Railway logs for errors
- Verify environment variables are set correctly
- Make sure requirements.txt is up to date

---

## Next Steps

1. ✅ Set up local development
2. ✅ Deploy backend on Render/Railway
3. ✅ Deploy frontend on Vercel
4. ⭐ Add real stock price API (Alpha Vantage, Yahoo Finance)
5. ⭐ Add portfolio analytics and charts
6. ⭐ Implement leaderboard
7. ⭐ Add email notifications
8. ⭐ Upgrade to PostgreSQL database

---

## Additional Resources

- **Flask Documentation**: https://flask.palletsprojects.com/
- **Render Docs**: https://render.com/docs
- **Railway Docs**: https://railway.app/docs
- **Vercel Docs**: https://vercel.com/docs
- **openpyxl Docs**: https://openpyxl.readthedocs.io/

---

## Support

If you encounter issues:
1. Check the logs on Render/Railway
2. Open browser console for frontend errors (F12)
3. Test API endpoints with Postman
4. Verify all environment variables are set correctly

---

**Happy Learning! 🚀**
