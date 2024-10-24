<script lang="ts">
  import { onMount } from 'svelte';
  export let food;
  export let claimItem;
  export let receivedOpenSnackbar;

  let converted_time: number;

  onMount(() => {
      converted_time = Number(food.set_time.slice(0, 2));
  });

  const handleClaim = (e: any) => {
      claimItem(e, food.is_claimed);
      receivedOpenSnackbar();
  };
</script>

<div class="search-items-wrapper">
  <div class="display-search-items-for-feed">
      <div id="search-item-name-container">
          <p>{food.name}</p>
      </div>
      <div id="search-item-weight-container">
          <p>{food.quantity * 3} pounds</p>
      </div>
      <div id="search-item-feeds-container">
          <p>{food.quantity} people</p>
      </div>
      <div id="search-item-pickup-container">
          <p>
              {converted_time === 0 || converted_time < 13
                  ? `${converted_time}am`
                  : `${converted_time - 12}pm`}
          </p>
      </div>
      <span class="span-claim-button" tabindex="0" role="button"
          on:click={handleClaim}
          on:keydown={(e) => { if (e.key === 'Enter') handleClaim(e) }}> 
          <button
              id={food.id}
              class="{food.is_claimed ? 'claimed-button' : 'unclaimed-button'}">
              {food.is_claimed ? 'UNCLAIM' : 'CLAIM'}
          </button>
      </span>
  </div>
</div>

<style>
  @import '../../routes/feed/css/SearchBarResultsVendorItemsDisplay.css'; /* Adjust CSS path */
</style>
