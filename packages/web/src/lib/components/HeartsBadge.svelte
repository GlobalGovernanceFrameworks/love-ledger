<!-- src/lib/components/HeartsBadge.svelte -->
<script lang="ts">
  import { Heart, TreePine } from 'lucide-svelte';
  
  export let hearts: number = 0;
  export let leaves: number = 0;
  export let size: 'sm' | 'md' | 'lg' = 'md';
  export let type: 'care' | 'ecology' | 'culture' | 'community' = 'care';
  
  const sizeClasses = {
    sm: 'text-sm px-2 py-1',
    md: 'text-base px-3 py-2', 
    lg: 'text-lg px-4 py-3'
  };
  
  const iconSizes = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5'
  };
</script>

<div class="flex items-center space-x-3">
  <!-- Hearts Display with Dynamic Color -->
  <div class="hearts-badge hearts-{type} {sizeClasses[size]}">
    <Heart class="{iconSizes[size]} fill-current hearts-pulse" />
    <span class="font-medium">{hearts.toLocaleString()}</span>
  </div>
  
  <!-- Leaves Display -->
  {#if leaves > 0}
    <div class="leaves-badge {sizeClasses[size]}">
      <TreePine class="{iconSizes[size]} leaves-sway" />
      <span class="font-medium">{leaves.toLocaleString()}</span>
    </div>
  {/if}
</div>
