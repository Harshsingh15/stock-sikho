# API Quick Reference

## Base URL

**Local**: `http://localhost:5000`  
**Production**: `https://your-backend.onrender.com`

## Authentication Header

```
Authorization: Bearer <JWT_TOKEN>
```

All endpoints except `/api/auth/*` require this header.

---

## Authentication Endpoints

### Register User

```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response (201)**:
```json
{
  "message": "Registration successful",
  "token": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "username": "john_doe",
  "wallet": 100000
}
```

### Login

```http
POST /api/auth/login
Content-Type: application/json

{
  "username": "john_doe",
  "password": "securepassword123"
}
```

**Response (200)**:
```json
{
  "message": "Login successful",
  "token": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "username": "john_doe",
  "email": "john@example.com",
  "wallet": 100000,
  "total_invested": 0
}
```

---

## User Endpoints

### Get Profile

```http
GET /api/user/profile
Authorization: Bearer <TOKEN>
```

**Response (200)**:
```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "wallet_balance": 98500,
  "total_invested": 1500
}
```

### Get Portfolio

```http
GET /api/user/portfolio
Authorization: Bearer <TOKEN>
```

**Response (200)**:
```json
{
  "portfolio": [
    {
      "symbol": "AAPL",
      "quantity": 10,
      "avg_buy_price": 150.50,
      "current_value": 1550
    },
    {
      "symbol": "GOOGL",
      "quantity": 5,
      "avg_buy_price": 140.00,
      "current_value": 750
    }
  ]
}
```

### Get Transactions

```http
GET /api/user/transactions
Authorization: Bearer <TOKEN>
```

**Response (200)**:
```json
{
  "transactions": [
    {
      "action": "BUY",
      "symbol": "GOOGL",
      "quantity": 5,
      "price": 140.00,
      "total": 700.00,
      "timestamp": "2024-01-15 10:30:45"
    },
    {
      "action": "BUY",
      "symbol": "AAPL",
      "quantity": 10,
      "price": 150.50,
      "total": 1505.00,
      "timestamp": "2024-01-15 10:25:30"
    }
  ]
}
```

---

## Trading Endpoints

### Buy Stock

```http
POST /api/trade/buy
Authorization: Bearer <TOKEN>
Content-Type: application/json

{
  "symbol": "AAPL",
  "quantity": 10,
  "price": 150.50
}
```

**Response (200)**:
```json
{
  "message": "Purchase successful",
  "symbol": "AAPL",
  "quantity": 10,
  "total_cost": 1505.00
}
```

**Error (400)**:
```json
{
  "error": "Insufficient funds"
}
```

### Sell Stock

```http
POST /api/trade/sell
Authorization: Bearer <TOKEN>
Content-Type: application/json

{
  "symbol": "AAPL",
  "quantity": 5,
  "price": 155.00
}
```

**Response (200)**:
```json
{
  "message": "Sale successful",
  "symbol": "AAPL",
  "quantity": 5,
  "total_proceeds": 775.00
}
```

**Error (400)**:
```json
{
  "error": "Insufficient stocks to sell"
}
```

---

## Utility Endpoints

### Health Check

```http
GET /api/health
```

**Response (200)**:
```json
{
  "status": "ok"
}
```

---

## Error Codes

| Code | Meaning | Action |
|------|---------|--------|
| 200 | Success | Operation completed |
| 201 | Created | Resource created |
| 400 | Bad Request | Check parameters |
| 401 | Unauthorized | Missing/invalid token |
| 404 | Not Found | User doesn't exist |
| 409 | Conflict | Username exists |
| 500 | Server Error | Try again later |

---

## Common Error Responses

### Missing Token
```json
{
  "error": "Missing token"
}
```

### Invalid Token
```json
{
  "error": "Invalid token"
}
```

### User Not Found
```json
{
  "error": "User not found"
}
```

### Insufficient Funds
```json
{
  "error": "Insufficient funds"
}
```

### Insufficient Stocks
```json
{
  "error": "Insufficient stocks to sell"
}
```

---

## Using with JavaScript

### Initialize Client

```javascript
const API = new StockSikhoAPI('http://localhost:5000');
```

### Register

```javascript
try {
  const response = await API.register('john_doe', 'john@example.com', 'password123');
  console.log('Token:', response.token);
  console.log('Wallet:', response.wallet);
} catch (error) {
  console.error('Error:', error.message);
}
```

### Login

```javascript
try {
  const response = await API.login('john_doe', 'password123');
  console.log('Logged in as:', response.username);
} catch (error) {
  console.error('Error:', error.message);
}
```

### Buy Stock

```javascript
try {
  const response = await API.buyStock('AAPL', 10, 150.50);
  console.log('Purchase successful:', response);
} catch (error) {
  console.error('Error:', error.message);
}
```

### Sell Stock

```javascript
try {
  const response = await API.sellStock('AAPL', 5, 155.00);
  console.log('Sale successful:', response);
} catch (error) {
  console.error('Error:', error.message);
}
```

### Get Portfolio

```javascript
try {
  const data = await API.getPortfolio();
  console.log('Portfolio:', data.portfolio);
} catch (error) {
  console.error('Error:', error.message);
}
```

---

## Using with cURL

### Register

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john_doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Login

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john_doe",
    "password": "password123"
  }'
```

### Get Profile (with token)

```bash
curl -X GET http://localhost:5000/api/user/profile \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Buy Stock

```bash
curl -X POST http://localhost:5000/api/trade/buy \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "symbol": "AAPL",
    "quantity": 10,
    "price": 150.50
  }'
```

---

## Testing Workflow

1. **Register**: Create a new account
2. **Login**: Get authentication token
3. **Buy**: Purchase some stocks
4. **Get Portfolio**: View your holdings
5. **Sell**: Sell some stocks
6. **Get Transactions**: View transaction history
7. **Get Profile**: Check wallet balance

---

## Rate Limiting

Currently no rate limiting. In production, consider adding:
- 100 requests per minute per user
- 1000 requests per hour per IP

---

## CORS

Frontend and backend may be on different domains. CORS is enabled for:
- `http://localhost:*`
- `https://*.vercel.app`
- `https://*.onrender.com`
- `https://*.railway.app`

---

## Security Notes

1. **Always use HTTPS** in production
2. **Never commit `.env`** file with secrets
3. **Rotate SECRET_KEY** regularly
4. **Token expires** in 24 hours
5. **Passwords are hashed** with bcrypt
6. **Input is validated** on all endpoints

---

**Need help? Check DEPLOYMENT_GUIDE.md or INTEGRATION_GUIDE.md**
