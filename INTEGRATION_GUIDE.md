# Integration Guide: Connect Your HTML Frontend to Python Backend

## Quick Start

### 1. Add API Client Script

In your `stock-simulator.html`, add this in the `<head>` section (before closing `</head>`):

```html
<script src="api-client.js"></script>
```

### 2. Initialize API Client in Your JavaScript

At the beginning of your JavaScript code (inside the `<script>` tag), add:

```javascript
// Initialize API client
const API_BASE_URL = window.location.hostname === 'localhost'
  ? 'http://localhost:5000'
  : 'https://your-backend-url.onrender.com'; // Replace with your Render URL

const API = new StockSikhoAPI(API_BASE_URL);
```

---

## Replace Local Validation with Backend Calls

### Registration

**Before (Local Storage):**
```javascript
function handleRegister(username, email, password) {
  users[username] = { email, password, wallet: 100000 };
  // ... UI update
}
```

**After (Backend):**
```javascript
async function handleRegister(username, email, password) {
  try {
    const response = await API.register(username, email, password);
    console.log('Registered successfully:', response);
    
    // Update UI with response data
    currentUser = response.username;
    wallet = response.wallet;
    
    // Show dashboard
    showAuthScreen(false);
    updateDashboard();
  } catch (error) {
    showError(`Registration failed: ${error.message}`);
  }
}
```

### Login

**Before (Local Storage):**
```javascript
function handleLogin(username, password) {
  if (!users[username] || users[username].password !== password) {
    showError('Invalid credentials');
    return;
  }
  // ... UI update
}
```

**After (Backend):**
```javascript
async function handleLogin(username, password) {
  try {
    const response = await API.login(username, password);
    console.log('Logged in successfully:', response);
    
    // Update UI with response data
    currentUser = response.username;
    wallet = response.wallet;
    
    // Show dashboard
    showAuthScreen(false);
    updateDashboard();
  } catch (error) {
    showError(`Login failed: ${error.message}`);
  }
}
```

---

## Replace Trading Logic with Backend Calls

### Buy Stock

**Before (Local State):**
```javascript
function executeBuy(symbol, quantity, price) {
  const totalCost = quantity * price;
  if (wallet < totalCost) {
    showError('Insufficient funds');
    return;
  }
  
  wallet -= totalCost;
  portfolio[symbol] = { quantity, avgPrice: price };
  // ... UI update
}
```

**After (Backend):**
```javascript
async function executeBuy(symbol, quantity, price) {
  try {
    const response = await API.buyStock(symbol, quantity, price);
    console.log('Purchase successful:', response);
    
    // Update local state from backend
    await refreshPortfolio();
    await refreshWallet();
    showSuccess(`Bought ${quantity} shares of ${symbol}`);
  } catch (error) {
    showError(`Purchase failed: ${error.message}`);
  }
}
```

### Sell Stock

**Before (Local State):**
```javascript
function executeSell(symbol, quantity, price) {
  if (!portfolio[symbol] || portfolio[symbol].quantity < quantity) {
    showError('Insufficient shares');
    return;
  }
  
  const proceeds = quantity * price;
  wallet += proceeds;
  portfolio[symbol].quantity -= quantity;
  // ... UI update
}
```

**After (Backend):**
```javascript
async function executeSell(symbol, quantity, price) {
  try {
    const response = await API.sellStock(symbol, quantity, price);
    console.log('Sale successful:', response);
    
    // Update local state from backend
    await refreshPortfolio();
    await refreshWallet();
    showSuccess(`Sold ${quantity} shares of ${symbol}`);
  } catch (error) {
    showError(`Sale failed: ${error.message}`);
  }
}
```

---

## Add Helper Functions to Sync with Backend

```javascript
/**
 * Refresh wallet balance from backend
 */
async function refreshWallet() {
  try {
    const profile = await API.getProfile();
    wallet = profile.wallet_balance;
    updateWalletDisplay(); // Your existing UI update function
  } catch (error) {
    console.error('Failed to refresh wallet:', error);
  }
}

/**
 * Refresh portfolio from backend
 */
async function refreshPortfolio() {
  try {
    const data = await API.getPortfolio();
    portfolio = {};
    
    data.portfolio.forEach(item => {
      portfolio[item.symbol] = {
        quantity: item.quantity,
        avgPrice: item.avg_buy_price,
        currentValue: item.current_value
      };
    });
    
    updatePortfolioDisplay(); // Your existing UI update function
  } catch (error) {
    console.error('Failed to refresh portfolio:', error);
  }
}

/**
 * Get transaction history
 */
async function loadTransactions() {
  try {
    const data = await API.getTransactions();
    displayTransactions(data.transactions);
  } catch (error) {
    console.error('Failed to load transactions:', error);
  }
}

/**
 * Handle logout
 */
function handleLogout() {
  API.logout();
  currentUser = null;
  portfolio = {};
  wallet = 100000;
  
  showAuthScreen(true);
  clearUI();
}
```

---

## Update Your Tab/Navigation Handlers

```javascript
// When user switches to Portfolio tab
document.getElementById('portfolio-tab').addEventListener('click', async () => {
  await refreshPortfolio();
  // Show portfolio view
});

// When user switches to Dashboard tab
document.getElementById('dashboard-tab').addEventListener('click', async () => {
  await refreshWallet();
  await refreshPortfolio();
  // Show dashboard view
});

// When user switches to History tab
document.getElementById('history-tab').addEventListener('click', async () => {
  await loadTransactions();
  // Show transaction history
});
```

---

## Error Handling

Create a consistent error display:

```javascript
function showError(message) {
  const errorEl = document.querySelector('.error-msg');
  if (errorEl) {
    errorEl.textContent = message;
    errorEl.style.display = 'block';
    setTimeout(() => {
      errorEl.style.display = 'none';
    }, 5000);
  } else {
    alert(message);
  }
}

function showSuccess(message) {
  // Similar to showError but with success styling
  console.log('✓', message);
}
```

---

## Local Storage for User Session

```javascript
// On successful login
function onLoginSuccess(response) {
  localStorage.setItem('currentUser', response.username);
  localStorage.setItem('token', response.token);
  // API client automatically saves token to localStorage
}

// On page load, auto-login if token exists
window.addEventListener('load', async () => {
  const token = localStorage.getItem('token');
  if (token) {
    API.setToken(token);
    try {
      const profile = await API.getProfile();
      currentUser = profile.username;
      showAuthScreen(false);
      updateDashboard();
    } catch (error) {
      // Token expired or invalid
      handleLogout();
    }
  }
});

// On logout
function onLogout() {
  localStorage.removeItem('currentUser');
  localStorage.removeItem('token');
  API.logout();
  // ... redirect to auth screen
}
```

---

## Testing the Integration

### 1. Start Local Backend
```bash
cd backend
source venv/bin/activate  # On macOS/Linux
python app.py
```

### 2. Open Your HTML in Browser
```bash
# Open stock-simulator.html in your browser
# Or use a simple server:
python -m http.server 8000
# Then visit http://localhost:8000/stock-simulator.html
```

### 3. Test in Browser Console
```javascript
// Check if API client is loaded
console.log(API);

// Test health check
API.checkHealth().then(res => console.log('Health:', res));

// Test register
API.register('testuser', 'test@example.com', 'password123')
  .then(res => console.log('Registered:', res))
  .catch(err => console.error('Error:', err));

// Test login
API.login('testuser', 'password123')
  .then(res => console.log('Logged in:', res))
  .catch(err => console.error('Error:', err));
```

---

## Checklist for Integration

- [ ] Add `<script src="api-client.js"></script>` to HTML
- [ ] Initialize API client with correct backend URL
- [ ] Replace registration logic with `API.register()`
- [ ] Replace login logic with `API.login()`
- [ ] Replace buy/sell logic with `API.buyStock()` / `API.sellStock()`
- [ ] Add `refreshWallet()` and `refreshPortfolio()` helpers
- [ ] Add error handling with `showError()`
- [ ] Test with backend running locally
- [ ] Get backend URL from Render/Railway
- [ ] Update frontend API URL to production
- [ ] Deploy frontend to Vercel
- [ ] Verify CORS is working
- [ ] Test all features on production

---

## Common Issues & Fixes

### API returns 401 Unauthorized
```javascript
// Check if token is being sent
console.log('Token:', API.token);

// Re-login if needed
if (!API.isAuthenticated()) {
  handleLogin(username, password);
}
```

### CORS Error in Console
```
Access to XMLHttpRequest at 'http://localhost:5000/...' from origin 
'http://localhost:8000' has been blocked by CORS policy
```

**Fix**: Make sure backend is running and has CORS enabled

### "Cannot find module" error
```javascript
// Make sure api-client.js is in the same directory as your HTML
// Or update the path: <script src="/path/to/api-client.js"></script>
```

### Token expires after 24 hours
```javascript
// Implement auto-refresh or prompt user to login again
if (error.message.includes('expired')) {
  handleLogout();
}
```

---

## Next Steps

1. ✅ Integrate API calls into your HTML
2. ⭐ Add real stock price API
3. ⭐ Implement portfolio analytics
4. ⭐ Add leaderboard feature
5. ⭐ Create user profile page

---

**Ready to integrate? Let's go! 🚀**
