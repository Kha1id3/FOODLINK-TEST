<script lang="ts">
    import { snackbar, closeSnackbar } from '../stores/snackbar';
    import { onMount } from 'svelte';
  
    let showSnackbar = false;
  
    $: snackbar.subscribe(value => {
      showSnackbar = value.isOpen;
      if (showSnackbar) {
        setTimeout(() => {
          closeSnackbar();
        }, 3000); 
      }
    });
  </script>
  
  {#if showSnackbar}
    <div class="snackbar">
      <p>Action completed successfully!</p>
    </div>
  {/if}
  
  <style>
    .snackbar {
      position: fixed;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      background-color: #333;
      color: white;
      padding: 16px;
      border-radius: 8px;
      z-index: 1000;
    }
  </style>
  