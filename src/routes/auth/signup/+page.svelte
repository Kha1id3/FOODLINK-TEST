<script>
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import Auth from '../../../lib/utils/Auth';
    import { checkAuthenticateStatus, auth } from '../../../lib/stores/auth';
    import { writable } from 'svelte/store';
    import axios from 'axios';
  
   
    let email = '';
    let password = '';
    let type = 1; // 1 for Vendor, 2 for Non-Profit Org
    let name = '';
    let address = '';
    let body = '';
    let telephone = '';
    let clientCertificate = '';
    let ein = '';
    let profilePic = '';
    let isSubmitted = false;
  
    // Function to handle form submission
    /**
     * @param {Event} e - 
     */
    const registerUser = async (e) => {
      e.preventDefault();
  
      try {
        if (type === 1) {
          await axios.post('/api/users/new', {
            email,
            password_digest: password,
            type,
            name,
            address_field: address,
            body,
            telephone_number: telephone,
            ein,
            profile_pic: profilePic,
          });
        } else {
          await axios.post('/api/users/new', {
            email,
            password_digest: password,
            type,
            name,
            address_field: address,
            body,
            telephone_number: telephone,
            client_certificate: clientCertificate,
            profile_pic: profilePic,
          });
        }
  
        Auth.authenticateUser(email);
        checkAuthenticateStatus();
        isSubmitted = true;
      } catch (error) {
        console.error('Registration failed:', error);
      }
    };
  
    // Conditional redirection after registration
    $: if (isSubmitted) {
      if (type === 1) {
        goto(`/vendor/dashboard`);
      } else if (type === 2) {
        goto('/feed');
      }
    }
  </script>
  
  <div id="signup-page">
    <h3 id="signup-header">Join FoodLink!</h3>
    <div class="choose-user-signup-form">
      <fieldset>
        <legend class="user-type">
          <p id="signup-header-body">
            Are you a food vendor or non-profit organization?
          </p>
        </legend>
        <div>
          <label>
            <input type="radio" bind:group={type} value="1" />
            Food Vendor
          </label>
          <label>
            <input type="radio" bind:group={type} value="2" />
            Non-profit Organization
          </label>
        </div>
      </fieldset>
    </div>
  
    <form on:submit={registerUser} class="signup-form" id="{type === 1 ? 'vendor-signup-form' : 'client-signup-form'}">
      <h1 class="signup-form-header">{type === 1 ? 'Food Vendor' : 'Non-Profit Org'}</h1>
      <div class="icon-input-field">
        <img src="/icons/auth/name.png" alt="name" class="icons" />
        <input
          required
          class="input-field"
          type="text"
          name="name"
          placeholder="{type === 1 ? 'Business Name' : 'Non-Profit Name'}"
          bind:value={name}
        />
      </div>
      <div class="icon-input-field">
        <img src="/icons/auth/email.png" alt="email" class="icons" />
        <input
          required
          class="input-field"
          type="text"
          name="email"
          placeholder="Email"
          bind:value={email}
        />
      </div>
      <div class="icon-input-field">
        <img src="/icons/auth/password.png" alt="password" class="icons" />
        <input
          required
          class="input-field"
          type="password"
          name="password"
          placeholder="Password"
          bind:value={password}
        />
      </div>
      <div class="icon-input-field">
        <img src="/icons/auth/address.png" alt="address" class="icons" />
        <input
          required
          class="input-field"
          type="text"
          name="address"
          placeholder="Address"
          bind:value={address}
        />
      </div>
      {#if type === 2}
        <div class="icon-input-field">
          <img src="/icons/auth/certificate.png" alt="certificate" class="icons" />
          <input
            required
            class="input-field"
            type="text"
            name="clientCertificate"
            placeholder="Client Certificate"
            bind:value={clientCertificate}
          />
        </div>
      {/if}
      <div class="icon-input-field">
        <img src="/icons/auth/phone.png" alt="phone" class="icons" />
        <input
          required
          class="input-field"
          type="text"
          name="telephone"
          placeholder="Telephone Number"
          bind:value={telephone}
        />
      </div>
      <div class="icon-input-field">
        <img src="/icons/auth/profile-pic.png" alt="profile pic" class="icons" />
        <input
          required
          class="input-field"
          type="text"
          name="profilePic"
          placeholder="Profile Picture (URL)"
          bind:value={profilePic}
        />
      </div>
      <button type="submit" class="signup-button">Sign Up</button>
    </form>
  </div>
  
  <style>
    @import '../css/SignUp.css';
  </style>
  