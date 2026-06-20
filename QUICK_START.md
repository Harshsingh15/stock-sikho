# 🚀 Quick Start Guide - 5 Minutes to Running

## What You've Got

A **complete full-stack stock trading simulator** with:
- ✅ Frontend (HTML/JS) - Ready to use
- ✅ Backend (Python Flask) - Ready to deploy
- ✅ Database (Excel with openpyxl) - Auto-created
- ✅ Authentication (JWT tokens) - Secure
- ✅ Trading API - Buy/sell stocks
- ✅ Deployment configs - For Render, Railway, Vercel

---

## Step 1: Run Backend Locally (2 min)

### On macOS/Linux:
```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python app.py
```

### On Windows:
```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

✅ **Server runs at `http://localhost:5000`**

---

## Step 2: Open Frontend (1 min)

Open `stock-simulator.html` in your browser (or use):
```bash
python -m http.server 8000
# Then visit: http://localhost:8000/stock-simulator.html
```

---

## Step 3: Test It (2 min)

1. **Register** → Create new account
2. **Buy Stocks** → Trade virtual stocks  
3. **Check Portfolio** → View your holdings
4. **Check History** → See transaction logs

---

## Database Preview

After first run, you'll have `users_db.xlsx` with 3 sheets:

| Sheet | Contains |
|-------|----------|
| **Users** | Accounts, passwords (hashed), wallet balance |
| **Transactions** | All buy/sell history |
| **Portfolio** | Current stock holdings |

---

## Deploy to Production (5-10 min per service)

### Option A: Deploy Backend to Render (Recommended)

1. Push to GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/stock-simulator.git
git push -u origin main
```

2. Go to **https://render.com** → "New Web Service"
3. Connect your repo
4. Set build command: `pip install -r requirements.txt`
5. Set start command: `gunicorn app:app`
6. Deploy! 🎉

**Copy your backend URL** (e.g., `https://stocksikho-backend.onrender.com`)

### Option B: Deploy Frontend to Vercel

1. Go to **https://vercel.com** → Import Project
2. Connect your GitHub repo
3. Deploy! 🎉
4. Update `api-client.js` to use your Render backend URL

---

## Update Frontend for Production

In `stock-simulator.html`, find where API is initialized and update:

```javascript
const API_BASE_URL = 'https://your-backend.onrender.com';
const API = new StockSikhoAPI(API_BASE_URL);
```

---

## Project Structure

```
stock/
├── 📄 stock-simulator.html         ← Your frontend
├── 📄 api-client.js                ← Connects frontend to backend
├── 📁 backend/
│   ├── 🐍 app.py                   ← Flask server
│   ├── 📄 requirements.txt          ← Python packages
│   ├── 📄 Procfile                 ← For Railway
│   ├── 📄 render.yaml              ← For Render
│   └── 📄 setup.sh                 ← Local setup
├── 📖 README.md                    ← Full documentation
├── 📖 DEPLOYMENT_GUIDE.md          ← Detailed deployment
├── 📖 INTEGRATION_GUIDE.md         ← Frontend integration
└── 📖 API_REFERENCE.md             ← API docs
```

---

## API Quick Usage

### Register
```javascript
await API.register('username', 'email@example.com', 'password');
```

### Login
```javascript
await API.login('username', 'password');
```

### Buy Stock
```javascript
await API.buyStock('AAPL', 10, 150.50);
```

### Sell Stock
```javascript
await API.sellStock('AAPL', 5, 155.00);
```

### Get Portfolio
```javascript
const portfolio = await API.getPortfolio();
```

See **API_REFERENCE.md** for full API docs.

---

## Testing with Browser Console

```javascript
// Check API is loaded
console.log(API);

// Test health check
API.checkHealth().then(r => console.log('✓ Backend OK:', r));

// Test register
API.register('test123', 'test@example.com', 'pass123')
  .then(r => console.log('✓ Registered:', r))
  .catch(e => console.error('✗ Error:', e));

// Test login
API.login('test123', 'pass123')
  .then(r => console.log('✓ Logged in:', r))
  .catch(e => console.error('✗ Error:', e));
```

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| **Backend won't start** | Check Python 3.8+, run `pip install -r requirements.txt` |
| **CORS error** | Backend must be running, check URL in `api-client.js` |
| **Can't login** | Make sure you registered first, token expires in 24h |
| **"Module not found"** | Run `pip install -r requirements.txt` again |

---

## Next Steps

1. ✅ Get it running locally
2. ✅ Deploy backend to Render
3. ✅ Deploy frontend to Vercel
4. 🎯 Integrate real stock APIs (Alpha Vantage, Yahoo Finance)
5. 🎯 Add portfolio analytics
6. 🎯 Create leaderboard

---

## Documentation Map

- **🚀 This file** - Get started NOW
- **📖 README.md** - Project overview
- **🔧 DEPLOYMENT_GUIDE.md** - Full deployment steps
- **💻 INTEGRATION_GUIDE.md** - Connect frontend to backend
- **📚 API_REFERENCE.md** - All endpoints & examples

---

## Support

- Check **DEPLOYMENT_GUIDE.md** for detailed help
- Check **INTEGRATION_GUIDE.md** for frontend questions
- Check **API_REFERENCE.md** for API details
- Logs available in Render/Railway dashboard

---

## Environment Variables

Create `backend/.env`:
```env
FLASK_ENV=production
SECRET_KEY=your-secret-key-here
PORT=5000
```

See `.env.example` for template.

---

## File Checklist

- [x] Frontend HTML ready
- [x] Backend API complete
- [x] Database auto-creating
- [x] Deployment configs ready
- [x] Authentication working
- [x] Trading system ready
- [ ] (Your next feature!)

---

**Everything is set up and ready! Pick a step above and get started! 🎉**

Questions? Check the docs:
- **Local setup issues?** → DEPLOYMENT_GUIDE.md (Step 1)
- **Frontend not working?** → INTEGRATION_GUIDE.md
- **API questions?** → API_REFERENCE.md
- **Deployment stuck?** → DEPLOYMENT_GUIDE.md (Step 2-3)

---

**You got this! Let's go! 🚀**
