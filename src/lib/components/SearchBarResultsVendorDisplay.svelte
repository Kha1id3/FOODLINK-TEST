<script lang="ts">
    import { goto } from '$app/navigation';
  
    export let vendorName;
  
     export let allVendors: any[] = [];
  
    let vendorInfo: { address_field: any; profile_picture: any; };
  
    $: {
      vendorInfo = allVendors.find(info => info.vendor_name === vendorName);
    }
  
    const goToClientView = () => {
      goto(`/clientview/${vendorName}`);
    };
  </script>
  
  {#if vendorInfo}
  <button class="display-vendor-name-feed-search" on:click={goToClientView}>
    <span class="display-item-name">{vendorName}</span>
    <div class="vendor-address-field">
      <p class="address-text">{vendorInfo.address_field}</p>
    </div>
    <div class="vendor-account-profile-pic">
      <img
        class="feed-profile-pic"
        src={vendorInfo.profile_picture}
        alt=""
      />
    </button>
  

  {/if}
  

  