<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import Auth from '../../../lib/utils/Auth';
  import { checkAuthenticateStatus, auth } from '../../../lib/stores/auth';
  import { get } from 'svelte/store';
  import axios from 'axios';


  let email = '';
  let password = '';
  let isSubmitted = false;


  let currentUser;
  $: currentUser = get(auth);

  // Function to handle form submission
  /**
   * @param {Event} e - The event to triggered by form submission
   */
   const loginUser = async (e) => {
  e.preventDefault();
  try {
    console.log('Submitting login form with:', email, password);
    const response = await axios.post('/api/sessions/login/', { email, password_digest: password });
    console.log('Login response:', response.data);
    Auth.authenticateUser(email);
    checkAuthenticateStatus();
    email = '';
    password = '';
    isSubmitted = true;
    console.log('Login submitted successfully');
  } catch (error) {
    console.error('Login failed:', error);
  }
};

// Conditional redirection after login
$: if (isSubmitted && currentUser && currentUser.isAuthenticated) {
  console.log('User authenticated:', currentUser);
  const userInfo = currentUser.userInfo || {};
  
  // Check if we're in the browser environment
  if (typeof window !== 'undefined') {
    if (userInfo && 'type' in userInfo && userInfo.type === 1) {
      console.log('Redirecting to vendor dashboard...');
      goto('/vendor/dashboard');
    } else if (userInfo && 'type' in userInfo && userInfo.type === 2) {
      console.log('Redirecting to feed...');
      goto('/feed');
    }
  }
}
</script>

<div class="loginWrapper">
  <form on:submit={loginUser} id="login-form">
    <h1 id="login-header">Login</h1>
    <div id="login-email">
      <img src="/icons/auth/email.png" alt="email" class="icons" id="login-email-icon" />
      <input
        required
        type="text"
        id="email-input"
        value={email}
        name="email"
        placeholder="Email"
        on:input={(e) => {
          email = e.target instanceof HTMLInputElement ? e.target.value : '';
        }}
      />
    </div>
    <div id="login-password">
      <img src="/icons/auth/password.png" alt="password" class="icons" id="login-password-icon" />
      <input
        required
        type="password"
        id="password-input"
        value={password}
        name="password_digest"
        placeholder="Password"
        on:input={(e) => {
          password = e.target instanceof HTMLInputElement ? e.target.value : '';
        }}
      />
    </div>
    <br />
    <button type="submit" class="login-button">Login</button>
    <div class="notMemberDiv">
      <p>Don't have an account?</p>
      <p><a href="/auth/signup" id="signup-link">Sign up</a></p>
    </div>
  </form>
</div>

<style>
  @import '../css/Login.css';
</style>
