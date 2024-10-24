<script lang="ts">
  import { onMount } from 'svelte';
  let currentIndex = 0;
  let images = [
    "/images/carousel-3-cropped-v1.jpg",
    "/images/carousel-4-cropped-v1.jpg",
    "/images/carousel-5-cropped-v1.jpg"
  ];

  /**
     * @type {number | undefined}
     */
  let timer: number | undefined;

  // Function to go to the next slide
  const nextSlide = () => {
    currentIndex = (currentIndex + 1) % images.length;
  };

  // Function to go to a specific slide when a dot is clicked
  const goToSlide = (/** @type {number} */ index: number) => {
    currentIndex = index;
  };

  // Start the autoplay when the component mounts
  onMount(() => {
    timer = setInterval(() => {
      nextSlide();
    }, 2000); 

    // Cleanup the interval when the component unmounts
    return () => {
      clearInterval(timer);
    };
  });
</script>

<div class="carousel-wrapper">
  <div class="carousel-slides">
    {#each images as img, index}
    <img
    src={img}
    alt=""  
    class="carousel-image {index === currentIndex ? 'active' : ''}"
    style="display: {index === currentIndex ? 'block' : 'none'}"
  />
    {/each}
  </div>

  <!-- Dots for navigation -->
  <div class="dots">
    {#each images as _, index}
      <button
        type="button"
        class="dot {index === currentIndex ? 'active-dot' : ''}" 
        on:click={() => goToSlide(index)}
      ></button>
    {/each}
  </div>
</div>

<style>
  .carousel-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 10%;
    position: relative;
    width: 100%;
    height: 400px; 
  }

  .carousel-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .carousel-slides {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
  }

  .carousel-image.active {
    display: block;
  }

  .carousel-image:not(.active) {
    display: none;
  }

  /* Dots container */
  .dots {
    display: flex;
    justify-content: center;
    margin-top: 10px;
  }

  /* Each dot */
  .dot {
    height: 12px;
    width: 12px;
    margin: 0 5px;
    background-color: #bbb;
    border-radius: 50%;
    display: inline-block;
    cursor: pointer;
    border: none; 
    outline: none;
  }

  /* Active dot */
  .active-dot {
    background-color: #717171;
  }
</style>
