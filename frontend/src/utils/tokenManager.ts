// Secure token management utility
export class TokenManager {
  private static readonly TOKEN_KEY = 'auth_token';
  private static readonly REMEMBER_KEY = 'remember_me';
  private static readonly REFRESH_TOKEN_KEY = 'refresh_token';

  // Store token securely based on remember me preference
  static setToken(token: string, rememberMe: boolean = false): void {
    try {
      if (rememberMe) {
        // Use localStorage for persistent storage when user chooses to remember
        localStorage.setItem(this.TOKEN_KEY, token);
        localStorage.setItem(this.REMEMBER_KEY, 'true');
      } else {
        // Use sessionStorage for temporary storage
        sessionStorage.setItem(this.TOKEN_KEY, token);
        localStorage.setItem(this.REMEMBER_KEY, 'false');
      }
    } catch (error) {
      console.error('Failed to store token:', error);
      // Fallback to sessionStorage if localStorage fails
      sessionStorage.setItem(this.TOKEN_KEY, token);
    }
  }

  // Retrieve token from storage
  static getToken(): string | null {
    try {
      // Check sessionStorage first (for current session)
      const sessionToken = sessionStorage.getItem(this.TOKEN_KEY);
      if (sessionToken) {
        return sessionToken;
      }

      // Check localStorage if remember me was enabled
      const rememberMe = localStorage.getItem(this.REMEMBER_KEY) === 'true';
      if (rememberMe) {
        return localStorage.getItem(this.TOKEN_KEY);
      }

      return null;
    } catch (error) {
      console.error('Failed to retrieve token:', error);
      return null;
    }
  }

  // Remove token from all storage locations
  static removeToken(): void {
    try {
      localStorage.removeItem(this.TOKEN_KEY);
      sessionStorage.removeItem(this.TOKEN_KEY);
      localStorage.removeItem(this.REMEMBER_KEY);
      localStorage.removeItem(this.REFRESH_TOKEN_KEY);
    } catch (error) {
      console.error('Failed to remove token:', error);
    }
  }

  // Check if user chose to be remembered
  static isRememberMeEnabled(): boolean {
    try {
      return localStorage.getItem(this.REMEMBER_KEY) === 'true';
    } catch (error) {
      return false;
    }
  }

  // Validate token format (basic JWT structure check)
  static isValidTokenFormat(token: string): boolean {
    if (!token || typeof token !== 'string') {
      return false;
    }

    // JWT should have 3 parts separated by dots
    const parts = token.split('.');
    if (parts.length !== 3) {
      return false;
    }

    // Basic base64 validation for each part
    try {
      parts.forEach(part => {
        if (!part) throw new Error('Empty part');
        atob(part.replace(/-/g, '+').replace(/_/g, '/'));
      });
      return true;
    } catch {
      return false;
    }
  }

  // Get token with validation
  static getValidToken(): string | null {
    const token = this.getToken();
    if (!token || !this.isValidTokenFormat(token)) {
      this.removeToken(); // Clear invalid token
      return null;
    }
    return token;
  }

  // Setup automatic token cleanup on browser close (if not remembered)
  static setupTokenCleanup(): void {
    const handleBeforeUnload = () => {
      if (!this.isRememberMeEnabled()) {
        this.removeToken();
      }
    };

    // Clean up on page unload if not remembered
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Also clean up on visibility change (browser tab switch)
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden' && !this.isRememberMeEnabled()) {
        // Optional: Clear session storage when tab becomes hidden
        sessionStorage.removeItem(this.TOKEN_KEY);
      }
    });

    // Return cleanup function
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }

  // Token expiry management
  static isTokenExpired(token: string): boolean {
    try {
      if (!this.isValidTokenFormat(token)) {
        return true;
      }

      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Math.floor(Date.now() / 1000);
      
      return payload.exp && payload.exp < currentTime;
    } catch {
      return true; // Assume expired if we can't parse
    }
  }

  // Get token with expiry check
  static getTokenIfValid(): string | null {
    const token = this.getValidToken();
    if (!token) return null;

    if (this.isTokenExpired(token)) {
      this.removeToken();
      return null;
    }

    return token;
  }

  // Migration utility for existing token storage
  static migrateExistingTokens(): void {
    try {
      // Check for old token storage patterns and migrate
      const oldToken = localStorage.getItem('token') || sessionStorage.getItem('token');
      const oldRememberMe = localStorage.getItem('rememberMe');

      if (oldToken) {
        const rememberMe = oldRememberMe === 'true' || oldRememberMe === true;
        this.setToken(oldToken, rememberMe);
        
        // Clean up old storage
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');
        localStorage.removeItem('rememberMe');
      }
    } catch (error) {
      console.error('Token migration failed:', error);
    }
  }
}

// Initialize token manager
TokenManager.setupTokenCleanup();
TokenManager.migrateExistingTokens();