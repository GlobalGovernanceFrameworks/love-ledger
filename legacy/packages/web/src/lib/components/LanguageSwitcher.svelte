<!-- src/lib/components/LanguageSwitcher.svelte - Updated for custom i18n -->
<script lang="ts">
  import { Globe } from 'lucide-svelte';
  import { locale, setLocale, supportedLocales, getLanguageName } from '$lib/i18n';
  import { page } from '$app/stores';
  
  // Flag emojis for visual appeal
  const languageFlags = {
    en: '🇺🇸',
    sv: '🇸🇪'
  };
  
  let isOpen = false;
  
  function switchLanguage(newLang: string) {
    setLocale(newLang);
    isOpen = false;
  }
  
  function handleClickOutside(event: MouseEvent) {
    if (!event.target || !(event.target instanceof Element)) return;
    if (!event.target.closest('.language-switcher')) {
      isOpen = false;
    }
  }
</script>

<svelte:window on:click={handleClickOutside} />

<div class="language-switcher relative">
  <!-- Current Language Button -->
  <button 
    class="language-button flex items-center space-x-2 px-3 py-2 rounded-xl transition-all duration-200"
    style="background: var(--bg-card); border: 1px solid var(--border-medium);"
    on:click={() => isOpen = !isOpen}
    aria-label="Switch language"
    aria-expanded={isOpen}
  >
    <Globe class="h-4 w-4 flex-shrink-0" style="color: var(--text-secondary);" />
    <span class="flag text-sm leading-none relative top-[3px]">{languageFlags[$locale]}</span>
    <span class="language-name text-sm font-medium hidden sm:block leading-none relative top-[3px]" style="color: var(--text-primary);">
      {getLanguageName($locale)}
    </span>
    <svg 
      class="chevron h-3 w-3 flex-shrink-0 transition-transform duration-200 {isOpen ? 'rotate-180' : ''}" 
      style="color: var(--text-secondary);"
      fill="none" 
      viewBox="0 0 24 24" 
      stroke="currentColor"
    >
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
    </svg>
  </button>
  
  <!-- Dropdown Menu -->
  {#if isOpen}
    <div 
      class="language-dropdown absolute right-0 mt-2 w-48 rounded-xl shadow-lg z-50 border"
      style="background: var(--bg-card); border-color: var(--border-medium); box-shadow: var(--shadow-medium);"
    >
      <div class="py-2">
        {#each supportedLocales as lang}
          <button
            class="language-option w-full flex items-center px-4 py-2 text-sm transition-colors duration-200"
            class:active={lang === $locale}
            style="color: {lang === $locale ? 'var(--vibrant-green)' : 'var(--text-primary)'};"
            on:click={() => switchLanguage(lang)}
          >
            <span class="flag mr-3 text-base leading-none flex items-center">{languageFlags[lang]}</span>
            <span class="language-name font-medium leading-none flex items-center">{getLanguageName(lang)}</span>
            {#if lang === $locale}
              <svg class="ml-auto h-4 w-4 flex-shrink-0" style="color: var(--vibrant-green);" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
            {/if}
          </button>
        {/each}
      </div>
    </div>
  {/if}
</div>

<style>
  .language-button:hover {
    background: var(--bg-card-hover) !important;
    transform: translateY(-1px);
    box-shadow: var(--shadow-soft);
  }
  
  .language-option:hover {
    background: rgba(34, 197, 94, 0.1) !important;
  }
  
  .language-option.active {
    background: rgba(34, 197, 94, 0.1) !important;
    font-weight: 600;
  }
  
  .chevron {
    transition: transform 0.2s ease;
  }
  
  /* Smooth dropdown animation */
  .language-dropdown {
    animation: slideDown 0.2s ease-out;
  }
  
  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  /* Mobile responsive */
  @media (max-width: 640px) {
    .language-dropdown {
      right: -1rem;
      left: -1rem;
      width: auto;
    }
  }
</style>
