<!-- src/lib/components/ColorShiftingHeart.svelte -->
<script lang="ts">
  import { Heart } from 'lucide-svelte';
  import { onMount } from 'svelte';
  import { t } from '$lib/i18n';
  
  export let size: 'sm' | 'md' | 'lg' | 'xl' = 'md';
  export let speed: 'slow' | 'medium' | 'fast' = 'medium';
  export let category: string | null = null; // For fixed category
  export let showTooltip: boolean = false; // Control tooltip visibility
  
  // Extended Hearts Categories System
  const heartCategories = {
    // Core Love Ledger Categories
    community: { color: '#fbbf24', translationKey: 'common.hearts.categories.community' }, // Golden yellow
    care: { color: '#ef4444', translationKey: 'common.hearts.categories.care' }, // Warm red
    ecology: { color: '#22c55e', translationKey: 'common.hearts.categories.ecology' }, // Living green
    culture: { color: '#8b5cf6', translationKey: 'common.hearts.categories.culture' }, // Deep purple
    
    // Expanded Categories
    healing: { color: '#06b6d4', translationKey: 'common.hearts.categories.healing' }, // Cyan blue
    wisdom: { color: '#dc2626', translationKey: 'common.hearts.categories.wisdom' }, // Deep red
    creativity: { color: '#a855f7', translationKey: 'common.hearts.categories.creativity' }, // Royal purple
    protection: { color: '#475569', translationKey: 'common.hearts.categories.protection' }, // Dark slate
    peace: { color: '#f8fafc', translationKey: 'common.hearts.categories.peace' }, // Pure white
    earth: { color: '#92400e', translationKey: 'common.hearts.categories.earth' }, // Earth brown
    
    // Seasonal/Spiritual Categories
    fire: { color: '#dc2626', translationKey: 'common.hearts.categories.fire' },
    water: { color: '#0ea5e9', translationKey: 'common.hearts.categories.water' },
    air: { color: '#e5e7eb', translationKey: 'common.hearts.categories.air' },
    spirit: { color: '#f3e8ff', translationKey: 'common.hearts.categories.spirit' }
  };
  
  const categoryKeys = Object.keys(heartCategories);
  let currentCategoryIndex = 0;
  let isAnimating = true;
  
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8', 
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };
  
  const speeds = {
    slow: 6000,   // Increased from 4000 to give more time to read scrolling text
    medium: 3500, // Increased from 2500
    fast: 2000    // Increased from 1500
  };
  
  $: currentCategory = category 
    ? heartCategories[category as keyof typeof heartCategories]
    : heartCategories[categoryKeys[currentCategoryIndex] as keyof typeof heartCategories];
  
  $: currentColor = currentCategory?.color || '#ef4444';
  $: currentCategoryName = currentCategory ? $t(currentCategory.translationKey) : '';
  
  onMount(() => {
    if (!category) {
      const interval = setInterval(() => {
        currentCategoryIndex = (currentCategoryIndex + 1) % categoryKeys.length;
      }, speeds[speed]);
      
      return () => clearInterval(interval);
    }
  });
  
  function handleHeartClick() {
    if (category) return; // Don't cycle if fixed category
    
    // Manual cycle on click
    currentCategoryIndex = (currentCategoryIndex + 1) % categoryKeys.length;
  }
</script>

<div 
  class="heart-logo-container {sizeClasses[size]} cursor-pointer"
  on:click={handleHeartClick}
  on:keydown={(e) => e.key === 'Enter' && handleHeartClick()}
  role="button"
  tabindex="0"
  title={showTooltip ? currentCategoryName : ''}
>
  <!-- Animated background glow -->
  <div 
    class="heart-glow absolute inset-0 rounded-full opacity-30 transition-all duration-1000 ease-in-out"
    style="background: {currentColor}; filter: blur(8px);"
  ></div>
  
  <!-- Heart icon with dynamic color -->
  <Heart 
    class="relative z-10 w-full h-full fill-current transition-all duration-1000 ease-in-out transform hover:scale-110" 
    style="color: {currentColor};"
  />
  
  <!-- Category name tooltip - only show if showTooltip is true -->
  {#if showTooltip && currentCategoryName}
    <div class="heart-tooltip">
      {currentCategoryName}
    </div>
  {/if}
</div>

<style>
  .heart-logo-container {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.2s ease;
  }
  
  .heart-logo-container:hover {
    transform: scale(1.05);
  }

  .heart-glow {
    animation: gentle-pulse 3s ease-in-out infinite;
  }
  
  @keyframes gentle-pulse {
    0%, 100% { 
      opacity: 0.2; 
      transform: scale(1);
    }
    50% { 
      opacity: 0.4; 
      transform: scale(1.1);
    }
  }

  .heart-tooltip {
    position: absolute;
    bottom: -1.6rem;
    left: 50%;
    transform: translateX(-50%);
    background: transparent;
    color: white;
    padding: 0;
    border-radius: 0;
    font-size: 0.75rem;
    opacity: 1;
    transition: opacity 0.3s ease;
    pointer-events: none;
    z-index: 60;
    border: none;
    box-shadow: none;
    backdrop-filter: none;
    width: 100px;
    overflow: visible;
    white-space: normal; /* Allow wrapping */
    font-weight: 500;
    text-align: center; /* Center the text */
    line-height: 1.2; /* Add some line spacing */
  }

  /* Smooth color transitions for accessibility */
  @media (prefers-reduced-motion: reduce) {
    .heart-logo-container, 
    .heart-glow,
    .heart-logo-container :global(svg) {
      transition: none !important;
      animation: none !important;
    }
  }

  .scrolling-text {
    display: inline-block;
    white-space: normal; /* Allow wrapping */
    /* Remove all animation */
  }

</style>
