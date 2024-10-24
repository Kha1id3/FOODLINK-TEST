<script>
    import Carousel from '../../lib/components/Carousel.svelte'; 
    import { goto } from '$app/navigation';
  </script>
  
  <div class="landing-wrapper">
    <div class="carousel-wrapper">
      <Carousel />
    </div>
    <div id="line1" />
    <div id="food-background-container" />
    <div id="landing-container">
      <div>
        <h1 id="mission-statement">Mission Statement</h1>
      </div>
      <div id="mission-statement-container">
        <p id="mission-statement-text">
          At FoodLink, our mission is to reduce food waste and hunger in the world. We do this by creating a platform where vendors can sign up and donate food, while clients can claim those food items and add their favorite vendors to their favorites.
          Check out our <a href="/resources" id="resources-link">resources</a> to find information about SNAP, nearby food pantries, and how you can help.
        </p>
      </div>
    </div>
    <div id="line2" />
    <div id="info-container">
      <div id="info-vendor-volunteer-client">
        <h1 id="info-container-header">Get Involved</h1>
        <div id="info-vendor">
          <img src="/images/vendor.png" alt="icon for vendor" id="vendor-logo" />
          <h3 id="user-type">Food Vendors</h3>
          <div id="get-involved-info">
            Vendors include restaurants, catering halls, nursing homes, etc. Sign up or log in using the links below, and you will be eligible for tax deductions if you donate food.
          </div>
        </div>
        <div id="info-volunteer">
          <img src="/images/client.png" alt="icon for vendor" id="volunteer-logo" />
          <h3 id="user-type">Volunteers</h3>
          <div id="get-involved-info">
            When you volunteer with FoodLink, you play a key role in fighting hunger & poverty. Your dedication will create life-changing experiences for your city.
          </div>
        </div>
        <div id="info-client">
          <img src="/images/npo-solid-black.png" alt="icon for client" id="client-logo" />
          <h3 id="user-type">Non-profit Organizations</h3>
          <div id="get-involved-info">
            Non-profits such as YMCA and WWF can register to claim donated food items. Sign up or log in using the links below.
          </div>
        </div>
      </div>
    </div>
    <div id="line" />
    <div id="login-container">
      <div class="login-sub-container-1">
        <button on:click={() => goto('/auth/signup')} id="signup-button">
          Get Started
        </button>
      </div>
      <div class="login-sub-container-2">
        <button on:click={() => goto('/auth/login')} id="login-button">
          Log In
        </button>
      </div>
    </div>
  </div>
  
  <style>
    @import './css/Landing.css';
  </style>
  
