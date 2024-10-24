<script lang="ts">
    export let foodDataObj;
    export let vendorName; 
    export let claimItem;
    /**
     * @type {string[]}
     */
    export let fadeTrigger: string[] = [];
  
    const isFaded = (/** @type {string} */ food_id: string) => fadeTrigger.includes(food_id);
  </script>
  
  <div class="food-list">
    <h2>{vendorName}</h2> 
    {#each foodDataObj as foodItem}
      <div class="food-item {isFaded(foodItem.food_id) ? 'faded' : ''}">
        <h3>{foodItem.food_name}</h3>
        <p>{foodItem.description}</p>
        <button id={foodItem.food_id} on:click={(e) => claimItem(e, foodItem.is_claimed, foodItem.food_id)}>
          {foodItem.is_claimed ? 'Unclaim' : 'Claim'}
        </button>
      </div>
    {/each}
  </div>
  
  <style>
    .food-list {
      display: flex;
      flex-wrap: wrap;
    }
  
    .food-item {
      background-color: #f9f9f9;
      margin: 10px;
      padding: 15px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      transition: opacity 0.3s ease;
    }
  
    .faded {
      opacity: 0.5;
    }
  
    h2 {
      font-size: 1.5em;
      margin-bottom: 10px;
    }
  </style>
  