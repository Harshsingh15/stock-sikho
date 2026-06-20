# 📈 StockSikho - Stock Market Learning Platform

A full-stack web application to learn stock market trading in a safe, risk-free environment. Built with HTML5 frontend and Python Flask backend with Excel database.

## 🌟 Features

- **User Authentication**: Secure registration and login with JWT tokens
- **Virtual Wallet**: Start with ₹100,000 in virtual cash
- **Real-time Trading**: Buy and sell stocks with current market prices
- **Portfolio Management**: Track your holdings and performance
- **Transaction History**: View all your past trades
- **Wallet Balance**: Monitor your available funds
- **Responsive Design**: Beautiful modern UI that works on all devices

## 🏗️ Architecture

```
Frontend (Vercel)
    ↓ API Calls (HTTP/CORS)
Backend (Render/Railway)
    ↓ Read/Write
Database (Excel - users_db.xlsx)
```

### Tech Stack

| Component | Technology |
|-----------|-----------|
| Frontend | HTML5, CSS3, JavaScript |
| Backend | Python 3.8+, Flask |
| Database | Excel (openpyxl) |
| Authentication | JWT (JSON Web Tokens) |
| Hosting | Vercel (Frontend), Render/Railway (Backend) |

## 📁 Project Structure

```
stock/
├── stock-simulator.html          # Main frontend application
├── api-client.js                 # JavaScript API client library
├── DEPLOYMENT_GUIDE.md           # Complete deployment instructions
├── INTEGRATION_GUIDE.md          # How to integrate frontend with backend
├── README.md                     # This file
├── .gitignore                    # Git ignore rules
└── backend/
    ├── app.py                    # Flask backend server
    ├── requirements.txt          # Python dependencies
    ├── Procfile                  # Railway/Heroku deployment config
    ├── render.yaml               # Render deployment config
    └── .env.example              # Environment variables template
```

## 🚀 Quick Start

### Local Development

#### 1. Install Backend Dependencies

```bash
cd backend
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

#### 2. Run Backend Server

```bash
# From backend directory
python app.py
```

Server will start at `http://localhost:5000`

#### 3. Open Frontend

```bash
# Open stock-simulator.html in your browser
# Or run a simple HTTP server:
python -m http.server 8000
# Then visit http://localhost:8000/stock-simulator.html
```

#### 4. Test the Application

- Register a new account
- Log in with your credentials
- Buy/sell stocks
- Check your portfolio and transaction history

## 🌐 Deployment

### Deploy Backend on Render (Free Tier)

1. Push code to GitHub
2. Go to https://render.com
3. Create Web Service from repository
4. Configure build command: `pip install -r requirements.txt`
5. Configure start command: `gunicorn app:app`
6. Add environment variables
7. Deploy!

**See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for detailed instructions.**

### Deploy Frontend on Vercel

1. Update API URL in HTML to point to your Render backend
2. Go to https://vercel.com
3. Import your GitHub repository
4. Click Deploy
5. Your site is live!

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login and get JWT token

### User
- `GET /api/user/profile` - Get user profile
- `GET /api/user/portfolio` - Get user's stock holdings
- `GET /api/user/transactions` - Get transaction history

### Trading
- `POST /api/trade/buy` - Buy stocks
- `POST /api/trade/sell` - Sell stocks

### Utility
- `GET /api/health` - Health check

## 🔗 API Client Usage

```javascript
// Initialize
const API = new StockSikhoAPI('http://localhost:5000');

// Register
await API.register('username', 'email@example.com', 'password');

// Login
await API.login('username', 'password');

// Get profile
const profile = await API.getProfile();

// Get portfolio
const portfolio = await API.getPortfolio();

// Buy stock
await API.buyStock('AAPL', 10, 150.50);

// Sell stock
await API.sellStock('AAPL', 5, 155.00);

// Get transactions
const transactions = await API.getTransactions();
```

## 📊 Database Schema

### Users Table
| Column | Type | Description |
|--------|------|-------------|
| Username | String | Primary key |
| Email | String | User email |
| Password | String | Hashed password |
| Wallet Balance | Float | Available cash |
| Total Invested | Float | Total amount invested |
| Created At | DateTime | Account creation date |

### Transactions Table
| Column | Type | Description |
|--------|------|-------------|
| Username | String | User who made trade |
| Action | String | BUY or SELL |
| Stock Symbol | String | Stock ticker symbol |
| Quantity | Integer | Number of shares |
| Price | Float | Price per share |
| Total | Float | Total transaction amount |
| Timestamp | DateTime | When trade occurred |

### Portfolio Table
| Column | Type | Description |
|--------|------|-------------|
| Username | String | User who holds stock |
| Stock Symbol | String | Stock ticker symbol |
| Quantity | Integer | Number of shares held |
| Avg Buy Price | Float | Average purchase price |
| Current Value | Float | Market value of holding |

## 🔒 Security Features

- Passwords hashed with bcrypt
- JWT token-based authentication
- CORS protection
- Input validation on all endpoints
- 24-hour token expiration

## 📈 Environment Variables

### Backend (.env)

```env
FLASK_ENV=production
SECRET_KEY=your-super-secret-key-min-32-chars
PORT=5000
```

See `.env.example` for template.

## 🐛 Troubleshooting

### CORS Errors
- Ensure backend is running
- Check that frontend URL is in CORS allowed origins
- Clear browser cache

### 401 Unauthorized
- Token may have expired (24 hours)
- Re-login to get new token
- Check browser console for errors

### Database Errors
- Ensure openpyxl is installed
- Check file permissions
- Verify Excel file path

See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for more troubleshooting.

## 🗺️ Roadmap

- [x] User authentication
- [x] Buy/sell stocks
- [x] Portfolio tracking
- [x] Transaction history
- [ ] Real stock price API integration
- [ ] Portfolio analytics & charts
- [ ] Leaderboard system
- [ ] Email notifications
- [ ] Mobile app
- [ ] Database migration to PostgreSQL
- [ ] Advanced charting

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the MIT License.

## 📧 Support

For issues, questions, or suggestions, please open an issue on GitHub or contact us.

## 🎓 Learning Resources

- [Flask Documentation](https://flask.palletsprojects.com/)
- [openpyxl Documentation](https://openpyxl.readthedocs.io/)
- [JWT Authentication](https://jwt.io/)
- [REST API Best Practices](https://restfulapi.net/)

## 🙏 Acknowledgments

Built with ❤️ for learning enthusiasts who want to understand stock market trading.

---

**Start trading, start learning! 📈🚀**

For detailed deployment instructions, see [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)

For integration steps, see [INTEGRATION_GUIDE.md](INTEGRATION_GUIDE.md)
