<script lang="ts">
  export let vendorName: string;
  export let profilePicture: string; // Add this line for profilePicture
  export let allVendors: any[] = [];

  import { goto } from '$app/navigation';

  let vendorInfo: { address_field: string; profile_picture: string } | undefined;

  $: vendorInfo = allVendors.find(info => info.vendor_name === vendorName);

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
        src={profilePicture} 
        alt=""
      />
    </div>
  </button>
{/if}

<style>
  @import '../../routes/feed/css/AllFeedItemsDisplayVendorName.css'; 
</style>
