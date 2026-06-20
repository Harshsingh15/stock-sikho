/**
 * StockSikho API Client
 * Handles all API calls to the Python backend
 */

class StockSikhoAPI {
  constructor(baseURL = 'http://localhost:5000') {
    this.baseURL = baseURL;
    this.token = localStorage.getItem('token') || null;
  }

  /**
   * Set authentication token
   */
  setToken(token) {
    this.token = token;
    localStorage.setItem('token', token);
  }

  /**
   * Get authentication headers
   */
  getHeaders() {
    const headers = {
      'Content-Type': 'application/json',
    };
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }
    return headers;
  }

  /**
   * Make API request
   */
  async request(endpoint, method = 'GET', body = null) {
    const url = `${this.baseURL}${endpoint}`;
    const options = {
      method,
      headers: this.getHeaders(),
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    try {
      const response = await fetch(url, options);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'API request failed');
      }

      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // ===== AUTH METHODS =====

  async register(username, email, password) {
    const data = await this.request('/api/auth/register', 'POST', {
      username,
      email,
      password,
    });
    this.setToken(data.token);
    return data;
  }

  async login(username, password) {
    const data = await this.request('/api/auth/login', 'POST', {
      username,
      password,
    });
    this.setToken(data.token);
    return data;
  }

  logout() {
    this.token = null;
    localStorage.removeItem('token');
  }

  // ===== USER METHODS =====

  async getProfile() {
    return this.request('/api/user/profile', 'GET');
  }

  async getPortfolio() {
    return this.request('/api/user/portfolio', 'GET');
  }

  async getTransactions() {
    return this.request('/api/user/transactions', 'GET');
  }

  // ===== TRADING METHODS =====

  async buyStock(symbol, quantity, price) {
    return this.request('/api/trade/buy', 'POST', {
      symbol,
      quantity: parseInt(quantity),
      price: parseFloat(price),
    });
  }

  async sellStock(symbol, quantity, price) {
    return this.request('/api/trade/sell', 'POST', {
      symbol,
      quantity: parseInt(quantity),
      price: parseFloat(price),
    });
  }

  // ===== UTILITY METHODS =====

  async checkHealth() {
    return this.request('/api/health', 'GET');
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated() {
    return this.token !== null;
  }

  /**
   * Clear all session data
   */
  clearSession() {
    this.logout();
    localStorage.clear();
  }
}

// Export for use in browser
if (typeof module !== 'undefined' && module.exports) {
  module.exports = StockSikhoAPI;
}
