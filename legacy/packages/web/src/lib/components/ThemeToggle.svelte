<!-- src/lib/components/ThemeToggle.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  import { Sun, Moon } from 'lucide-svelte';
  
  let currentTheme: 'earth' | 'cosmic' = 'earth';
  
  // Load theme from localStorage on mount
  onMount(() => {
    if (browser) {
      const savedTheme = localStorage.getItem('love-ledger-theme') as 'earth' | 'cosmic' || 'earth';
      setTheme(savedTheme);
    }
  });
  
  function setTheme(theme: 'earth' | 'cosmic') {
    currentTheme = theme;
    
    if (browser) {
      // Update document attribute
      if (theme === 'cosmic') {
        document.documentElement.setAttribute('data-theme', 'cosmic');
      } else {
        document.documentElement.removeAttribute('data-theme');
      }
      
      // Save to localStorage
      localStorage.setItem('love-ledger-theme', theme);
    }
  }
  
  function toggleTheme() {
    const newTheme = currentTheme === 'earth' ? 'cosmic' : 'earth';
    setTheme(newTheme);
  }
</script>

<button 
  class="theme-toggle" 
  on:click={toggleTheme}
  title={currentTheme === 'earth' ? 'Switch to Cosmic Night theme' : 'Switch to Living Earth theme'}
>
  <div class="theme-toggle-icon {currentTheme}">
    {#if currentTheme === 'earth'}
      <Sun class="w-4 h-4 text-white" />
    {:else}
      <Moon class="w-4 h-4 text-white" />
    {/if}
  </div>
  <span class="text-sm font-medium relative top-[3px]">
    {currentTheme === 'earth' ? 'Living Earth' : 'Cosmic Night'}
  </span>
</button>
