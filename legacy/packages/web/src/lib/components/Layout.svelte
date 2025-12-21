<!-- src/lib/components/Layout.svelte - Updated with custom i18n system -->
<script lang="ts">
  import { page } from '$app/stores';
  import { Heart, TreePine, Users, Settings, LogOut, Sparkles } from 'lucide-svelte';
  import ThemeToggle from './ThemeToggle.svelte';
  import ColorShiftingHeart from './ColorShiftingHeart.svelte';
  import LanguageSwitcher from './LanguageSwitcher.svelte';
  import { t, loadTranslations, detectLocale } from '$lib/i18n';
  import { onMount } from 'svelte';
  
  export let user: any = null;
  
  // Load translations on mount
  onMount(async () => {
    const locale = detectLocale();
    await loadTranslations(locale, $page.url.pathname);
  });
  
  $: navigation = [
    { name: $t('common.navigation.dashboard'), href: '/dashboard', icon: Heart },
    { name: $t('common.navigation.sharecare'), href: '/care/log', icon: Heart },
    { name: $t('common.navigation.witnesscare'), href: '/validate', icon: Users, role: 'community_weaver' },
    { name: $t('common.navigation.community'), href: '/community', icon: TreePine }
  ];
  
  $: filteredNavigation = navigation.filter(item => 
    !item.role || (user && user.role === item.role)
  );
</script>

<div class="min-h-screen">
  <!-- Navigation with Color-Shifting Heart Logo -->
  <nav class="nav-bar sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <!-- Logo and Brand with Color-Shifting Heart -->
        <div class="flex items-center">
          <a href="/" class="flex items-center space-x-3">
            <!-- Replace static heart with color-shifting heart -->
            <div class="p-2 rounded-xl backdrop-filter backdrop-blur-lg" style="background: rgba(255, 255, 255, 0.1);">
              <ColorShiftingHeart size="md" speed="medium" />
            </div>
            <span class="heading text-xl font-bold">{$t('common.site.title')}</span>
          </a>
        </div>
        
        <!-- Navigation Links -->
        {#if user}
          <div class="hidden md:flex items-center space-x-2">
            {#each filteredNavigation as item}
              <a 
                href={item.href}
                class="nav-link flex items-center space-x-2
                       {$page.url.pathname === item.href ? 'active' : ''}"
              >
                <svelte:component this={item.icon} class="h-4 w-4" />
                <span>{item.name}</span>
              </a>
            {/each}
          </div>
          
          <!-- User Menu with Language Switcher and Theme Toggle -->
          <div class="flex items-center space-x-3">
            <!-- Language Switcher -->
            <LanguageSwitcher />
            
            <!-- Theme Toggle -->
            <ThemeToggle />
            
            <!-- Hearts Balance Preview with Color Categories -->
            <div class="hidden sm:flex items-center space-x-3">
              <div class="hearts-badge hearts-care">
                <ColorShiftingHeart size="sm" category="care" />
                <span>247</span>
              </div>
              <div class="leaves-badge">
                <TreePine class="h-3 w-3" />
                <span>15</span>
              </div>
            </div>
            
            <!-- User Profile -->
            <div class="relative">
              <button class="flex items-center space-x-2 p-2 rounded-xl transition-all duration-200" 
                      style="background: var(--bg-card);">
                <div class="h-8 w-8 rounded-full flex items-center justify-center" 
                     style="background: var(--gradient-sunset-energy);">
                  <span class="text-white font-medium text-sm">
                    {user.displayName ? user.displayName.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span class="hidden md:block heading text-sm">{user.displayName || user.email}</span>
              </button>
              
              <!-- Dropdown Menu -->
              <div class="absolute right-0 mt-2 w-48 card hidden z-50" style="padding: 0.5rem;">
                <a href="/settings" class="flex items-center px-4 py-2 text-sm rounded-lg transition-colors"
                   style="color: var(--text-secondary);">
                  <Settings class="h-4 w-4 mr-2" />
                  {$t('common.navigation.settings')}
                </a>
                <form method="POST" action="/auth/logout">
                  <button type="submit" class="w-full flex items-center px-4 py-2 text-sm rounded-lg transition-colors"
                          style="color: var(--text-secondary);">
                    <LogOut class="h-4 w-4 mr-2" />
                    {$t('common.navigation.signout')}
                  </button>
                </form>
              </div>
            </div>
          </div>
        {:else}
          <!-- Language switcher and theme toggle for non-logged in users -->
          <div class="flex items-center space-x-3">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        {/if}
      </div>
    </div>
  </nav>
  
  <!-- Main Content -->
  <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
    <slot />
  </main>
</div>
