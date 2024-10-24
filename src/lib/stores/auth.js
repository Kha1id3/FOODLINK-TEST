import { writable } from 'svelte/store';
import axios from 'axios';
import Auth from '../utils/Auth';  // Import the Auth utility

// Store to hold authentication state
/**
 * @typedef {Object} AuthState
 * @property {string | null} user - The authenticated user, initially null.
 * @property {boolean} isAuthenticated - Indicates whether the user is authenticated.
 * @property {object} userInfo - Additional user information.
 * @property {string | null} error - Error message, initially null.
 */

/** @type {import('svelte/store').Writable<AuthState>} */
export const auth = writable({
    user: null,
    isAuthenticated: false,
    userInfo: {},
    error: null,
});

/**
 * Function to receive user status and update the store
 * @param {{user: string | null, isLoggedIn: boolean, userInfoObj: object}} user - The user information.
 */
export const receiveUserStatus = (user) => {
    auth.update(() => ({
        user: user.user,
        isAuthenticated: user.isLoggedIn,
        userInfo: user.userInfoObj,
        error: null,
    }));
};

/**
 * Function to check if user is authenticated
 * Updates the auth store based on the current user's status
 */
export const checkAuthenticateStatus = async () => {
    try {
      const user = await axios.get('/api/sessions/isLoggedIn');
      console.log('checkAuthenticateStatus user data:', user.data); // Add logging here
  
      const token = (typeof window !== 'undefined') ? Auth.getToken() : null;
  
      if (user.data.email === token) {
        receiveUserStatus({
          isLoggedIn: Auth.isUserAuthenticated(),
          user: token || '', // Handle case where token may be null
          userInfoObj: user.data,
        });
        console.log('Store updated with user data:', {
          isLoggedIn: Auth.isUserAuthenticated(),
          user: token || '',
          userInfoObj: user.data,
        });
      } else {
        if (user.data.email) {
          await logoutUser();
        } else {
          Auth.deauthenticateUser();
          auth.update((current) => ({
            ...current,
            isAuthenticated: false,
            user: null,
            userInfo: {},
          }));
        }
      }
    } catch (error) {
      const errMessage = (error instanceof Error) ? error.message : 'An unknown error occurred';
      console.error('Error checking authentication status:', errMessage);
      auth.update((current) => ({
        ...current,
        error: errMessage,
      }));
    }
  };

/**
 * Function to log out the user
 * Clears authentication state and deauthenticates the user
 */
export const logoutUser = async () => {
    try {
        await axios.post('/api/sessions/logout');
        Auth.deauthenticateUser();
        await checkAuthenticateStatus();
        receiveUserStatus({
            isLoggedIn: false,
            user: null, // Adding 'user' to match the expected structure
            userInfoObj: { email: null },
        });
    } catch (error) {
        const errMessage = (error instanceof Error) ? error.message : 'An unknown error occurred';
        console.error('Error logging out:', errMessage);
        auth.update((current) => ({
            ...current,
            error: errMessage,
        }));
    }
};
