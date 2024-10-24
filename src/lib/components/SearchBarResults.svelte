<script>
  import SearchBarResultsVendorDisplay from './SearchBarResultsVendorDisplay.svelte';
  import SearchBarResultsVendorItemsDisplay from './SearchBarResultsVendorItemsDisplay.svelte';

  /**
     * @type {any[]}
     */
   export let userSearchResults = [];
  /**
     * @type {never[]}
     */
   export let allVendors = [];
  export let claimItem; 
  export let receivedOpenSnackbar;
  /**
     * @type {string | any[]}
     */
   export let fadeTrigger = [];

  /**
     * @type {any[]}
     */
  let results = [];

  $: {
      // Group food items by vendor name
      results = userSearchResults.reduce((acc, foodItem) => {
        const vendorGroup = acc.find((/** @type {{ vendorName: any; }} */ group) => group.vendorName === foodItem.vendor_name);
        const isFaded = fadeTrigger.includes(foodItem.food_id);

        if (vendorGroup) {
          vendorGroup.foodItems.push(foodItem);
        } else {
          acc.push({
            vendorName: foodItem.vendor_name,
            foodItems: [foodItem],
            fadeTrigger: isFaded
          });
        }
        return acc;
      }, []);
  }
</script>

<div class="search-results-container">
  {#each results as { vendorName, foodItems }}
      <div>
          <SearchBarResultsVendorDisplay 
              vendorName={vendorName}
              allVendors={allVendors}
          />
          {#each foodItems as food}
              <SearchBarResultsVendorItemsDisplay
                  food={food}
                  claimItem={claimItem}
                  receivedOpenSnackbar={receivedOpenSnackbar}
              />
          {/each}
      </div>
  {/each}
</div>

<style>
  @import '../../routes/feed/css/SearchBarResults.css'; /* Adjust CSS path */
</style>
