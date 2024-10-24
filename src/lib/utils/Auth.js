// src/lib/utils/Auth.js

const Auth = {
  /**
   * Authenticate the user by storing the token.
   * @param {string} token - The authentication token.
   */
  authenticateUser: (token) => {
    localStorage.setItem("token", token);
  },
  
  /**
   * Check if the user is authenticated.
   * @returns {boolean} - Returns true if the user is authenticated.
   */
  isUserAuthenticated: () => {
    return localStorage.getItem("token") !== null;
  },
  
  /**
   * Deauthenticate the user by removing the token.
   */
  deauthenticateUser: () => {
    localStorage.removeItem("token");
  },
  
  /**
   * Get the stored authentication token.
   * @returns {string | null} - The stored token, or null if not present.
   */
  getToken: () => {
    return localStorage.getItem("token");
  }
};

export default Auth;
