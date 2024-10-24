<script>
  import AllFeedItemsDisplayed from '../../lib/components/AllFeedItemsDisplayed.svelte';
  import AllFeedItemsDisplayVendorName from '../../lib/components/AllFeedItemsDisplayVendorName.svelte';


  /**
     * @type {any[]}
     */
   export let allFoodItems = []; // Food items array
  /**
     * @type {any[]}
     */
   export let allVendors = [];   // Vendors array
  export let claimItem;         // Claim item function
  /**
     * @type {never[]}
     */
   export let fadeTrigger = [];  // Fade trigger array

  // Initialize data objects for food items and profile pictures.
  let foodDataObj = {};   
  let pictureObj = {};    

  // Function to map vendors to food items and return profile pictures
  const allVendorsMapped = (/** @type {{ [x: string]: any[]; }} */ foodDataObj) => {
    let newObj = {}; 
    let vendorNameArr = Object.keys(foodDataObj); 

    // Map each vendor's food items to its profile picture
    vendorNameArr.forEach((vendorName) => {
      foodDataObj[vendorName].forEach((/** @type {{ vendor_id: any; address_field: string | number; }} */ foodItem) => {
        allVendors.forEach((vendor) => {
          if (foodItem.vendor_id === vendor.vendor_id) {
            // @ts-ignore
            newObj[foodItem.address_field] = vendor.profile_picture;
          }
        });
      });
    });

    return newObj;
  };

  // Function to map food items to vendors
  const allFoodItemsMapped = () => {
    foodDataObj = {}; // Initialize food data object

    // Map each food item by vendor name
    allFoodItems.forEach((food) => {
      if (food.vendor_name && !food.is_claimed) {
        // @ts-ignore
        if (!foodDataObj[food.vendor_name]) {
          // @ts-ignore
          foodDataObj[food.vendor_name] = [];
        }
        // @ts-ignore
        foodDataObj[food.vendor_name].push(food);
      }
    });

    // @ts-ignore
    pictureObj = allVendorsMapped(foodDataObj);

    // Return mapped vendors and their corresponding food items
    return Object.keys(foodDataObj).map((vendorName) => ({
      vendorName,
      // @ts-ignore
      foodData: foodDataObj[vendorName],
      // @ts-ignore
      profilePicture: pictureObj[vendorName] || '',
    }));
  };
</script>


<div>
  {#if allFoodItems.length > 0}
    {#each allFoodItemsMapped() as { vendorName, foodData, profilePicture }}
      <div>
        <!-- Display vendor's name and profile picture -->
        <AllFeedItemsDisplayVendorName
          vendorName={vendorName}
          profilePicture={profilePicture}
        />

        <!-- Display the food items for this vendor -->
        <AllFeedItemsDisplayed
          foodDataObj={foodData}
          vendorName={vendorName}
          claimItem={claimItem}
          fadeTrigger={fadeTrigger}
        />
      </div>
    {/each}
  {/if}
</div>


<style>
  @import '../../routes/feed/css/AllFeedItems.css'; 
</style>
