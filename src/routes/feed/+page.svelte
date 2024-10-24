<script>
// @ts-nocheck

  import SearchBar from '$lib/components/SearchBar.svelte';
  import AllFeedItems from '$lib/components/AllFeedItems.svelte';
  import SearchBarResults from '$lib/components/SearchBarResults.svelte';
  import MainSnackbar from '$lib/components/MainSnackbar.svelte';
  import { openSnackbar } from '$lib/stores/snackbar';
  import axios from 'axios';
  import { onMount } from 'svelte';

  
  let allFoodItems = [];
  
  let allVendors= [];
  
  let fadeTrigger = [];
  let textInput = '';
  let searchText = '';
  let filteredFoodItems = [];

  const getAllFoodItems = async () => {
    try {
      const response = await axios.get('/api/foodItems');
      allFoodItems = response.data.food_items;
    } catch (err) {
      console.error(err);
    }
  };

  const getAllVendors = async () => {
    try {
      const response = await axios.get('/api/users/vendors/');
      allVendors = response.data.vendors;
    } catch (err) {
      console.error(err);
    }
  };

  
  const claimItem = (e, isClaimed, food_id) => {
    if (!isClaimed) {
      
      fadeTrigger = [...fadeTrigger, food_id];
      setTimeout(() => fireClaimingItem(food_id), 1100);
    } else {
      axios.patch(`/api/fooditems/claimstatus/${food_id}`, {
        client_id: null,
        is_claimed: false
      }).then(async () => {
        getAllFoodItems();
      });
    }
  };

  
  const fireClaimingItem = async (targetId) => {
    await axios.patch(`/api/fooditems/claimstatus/${targetId}`, {
      client_id: 1,
      is_claimed: true
    });
    getAllFoodItems();
    openSnackbar(); 
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();
    searchText = textInput.toLowerCase();
  };

  const search = () => {
    if (searchText === '') return [];
    
    return allFoodItems.filter(item => {
      const vendor = item.vendor_name.toLowerCase();
      const food = item.name.toLowerCase();
      return (vendor.includes(searchText) || food.includes(searchText)) && !item.is_claimed;
    });
  };

  
  $: filteredFoodItems = search();

  onMount(async () => {
    await getAllFoodItems();
    await getAllVendors();
  });
</script>

<MainSnackbar />

<div class="feedWrapper">
  <h1>Donation List</h1>
  <SearchBar
    textInput={textInput}
    on:inputChange={(e) => (textInput = e.detail)}
    on:submit={handleSubmit}
  />
  
  {#if filteredFoodItems.length > 0}
    <SearchBarResults
      claimItem={claimItem}
      userSearchResults={filteredFoodItems}
      allVendors={allVendors}
      receivedOpenSnackbar={openSnackbar} 
    />
  {:else}
    <AllFeedItems
      claimItem={claimItem}
      allFoodItems={allFoodItems}
      allVendors={allVendors}
      fadeTrigger={fadeTrigger}
    />
  {/if}
</div>

<style>
  @import './css/Feed.css'; 
</style>
