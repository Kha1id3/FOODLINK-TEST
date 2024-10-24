<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  // External props
  export let textInput = '';

  // Event dispatcher for communicating input changes and submission
  const dispatch = createEventDispatcher();

  // Handle input change events
  const handleChange = (/** @type {{ target: any; }} */ e: { target: any; }) => {
    // Ensure e.target is an HTMLInputElement before accessing 'value'
    const target = e.target;
    if (target && target.value !== undefined) {
      dispatch('inputChange', target.value); // Dispatch 'inputChange' event with input value
    }
  };

  // Handle form submission
  const handleSubmit = (/** @type {{ preventDefault: () => void; }} */ e: { preventDefault: () => void; }) => {
    e.preventDefault();
    dispatch('submit'); // Dispatch 'submit' event
  };
</script>

<!-- Search Bar Form -->
<form on:submit={handleSubmit}>
  <div id="search-container">
    <input
      type="text"
      id="search-input"
      on:input={handleChange}
      placeholder="Search…"
      bind:value={textInput} 
    />
    <button type="submit" id="search-submit">
      🔍 
    </button>
  </div>
</form>

<style>
  @import '../../routes/feed/css/SearchBar.css'; 
</style>
