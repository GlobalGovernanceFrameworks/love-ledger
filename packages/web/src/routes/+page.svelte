<!-- src/routes/+page.svelte - Updated with custom i18n system -->
<script lang="ts">
  import { Heart, TreePine, Users, Globe, ArrowRight, Sparkles } from 'lucide-svelte';
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { t, loadTranslations, detectLocale } from '$lib/i18n';
  
  export let data;
  
  // Color-shifting icon backgrounds
  const iconBackgrounds = {
    care: { color: '#ef4444', secondary: '#dc2626' },
    ecology: { color: '#22c55e', secondary: '#16a34a' },  
    community: { color: '#fbbf24', secondary: '#f59e0b' },
    healing: { color: '#06b6d4', secondary: '#0891b2' },
    culture: { color: '#8b5cf6', secondary: '#7c3aed' },
    earth: { color: '#92400e', secondary: '#78350f' },
    peace: { color: '#475569', secondary: '#334155' },
    wisdom: { color: '#dc2626', secondary: '#b91c1c' }
  };
  
  // Load translations on mount
  onMount(async () => {
    const locale = detectLocale();
    await loadTranslations(locale, $page.url.pathname);
  });
</script>

<svelte:head>
  <title>{$t('common.site.title')} - {$t('common.site.tagline')}</title>
  <meta name="description" content={$t('common.site.description')} />
</svelte:head>

<div class="min-h-screen">
  <!-- Hero Section with Theme-Aware Backgrounds -->
  <div class="hero-section relative overflow-hidden">
    <div class="max-w-7xl mx-auto">
      <div class="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32">
        <main class="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
          <div class="sm:text-center lg:text-left">
            <h1 class="heading text-4xl tracking-tight font-bold sm:text-5xl md:text-6xl">
              <span class="block">{$t('home.hero.heading')}</span>
            </h1>
            <p class="mt-3 text-lg sm:mt-5 sm:text-xl sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0" style="color: var(--text-secondary)">
              {$t('home.hero.description')}
            </p>
            
            <!-- Feature Highlights with Color-Shifting Backgrounds -->
            <div class="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3 lg:max-w-none">
              <div class="flex items-center space-x-3 hearts-pulse">
                <div class="color-shifting-icon p-3 rounded-2xl" 
                     style="background: linear-gradient(135deg, {iconBackgrounds.care.color}, {iconBackgrounds.care.secondary}); 
                            box-shadow: 0 4px 20px {iconBackgrounds.care.color}40;">
                  <Heart class="h-6 w-6 text-white fill-current" />
                </div>
                <span class="text-lg font-medium heading">{$t('home.hero.sharecare')}</span>
              </div>
              <div class="flex items-center space-x-3 leaves-sway">
                <div class="color-shifting-icon p-3 rounded-2xl" 
                     style="background: linear-gradient(135deg, {iconBackgrounds.ecology.color}, {iconBackgrounds.ecology.secondary}); 
                            box-shadow: 0 4px 20px {iconBackgrounds.ecology.color}40;">
                  <TreePine class="h-6 w-6 text-white" />
                </div>
                <span class="text-lg font-medium heading">{$t('home.hero.healland')}</span>
              </div>
              <div class="flex items-center space-x-3">
                <div class="color-shifting-icon p-3 rounded-2xl" 
                     style="background: linear-gradient(135deg, {iconBackgrounds.community.color}, {iconBackgrounds.community.secondary}); 
                            box-shadow: 0 4px 20px {iconBackgrounds.community.color}40;">
                  <Sparkles class="h-6 w-6 text-white" />
                </div>
                <span class="text-lg font-medium heading">{$t('home.hero.weavecommunity')}</span>
              </div>
            </div>
            
            <!-- CTA Buttons -->
            <div class="mt-12 sm:flex sm:justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
              {#if data.user}
                <div>
                  <a href="/dashboard" class="btn-primary flex items-center justify-center w-full sm:w-auto">
                    {$t('home.hero.continuejourney')}
                    <ArrowRight class="ml-2 h-5 w-5" />
                  </a>
                </div>
              {:else}
                <div>
                  <a href="/auth/register" class="btn-primary flex items-center justify-center w-full sm:w-auto">
                    {$t('home.auth.joincircle')}
                    <Heart class="ml-2 h-5 w-5 hearts-pulse" />
                  </a>
                </div>
                <div>
                  <a href="/auth/login" class="btn-secondary flex items-center justify-center w-full sm:w-auto">
                    {$t('home.auth.welcomeback')}
                  </a>
                </div>
              {/if}
            </div>
          </div>
        </main>
      </div>
    </div>
  </div>

  <!-- How It Works Section -->
  <div class="py-20" style="background: var(--bg-secondary);">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="lg:text-center">
        <h2 class="heading text-base font-semibold tracking-wide uppercase" style="color: var(--vibrant-orange);">{$t('home.howwegrow.title')}</h2>
        <p class="heading mt-2 text-3xl leading-8 font-bold tracking-tight sm:text-4xl" style="color: var(--text-primary);">
          {$t('home.howwegrow.subtitle')}
        </p>
        <p class="mt-4 max-w-2xl text-lg lg:mx-auto" style="color: var(--text-secondary);">
          {$t('home.howwegrow.description')}
        </p>
      </div>

      <div class="mt-20">
        <div class="grid grid-cols-1 gap-12 md:grid-cols-3">
          <!-- Step 1 -->
          <div class="text-center">
            <div class="card">
              <div class="color-shifting-icon flex items-center justify-center h-16 w-16 rounded-full mx-auto mb-6 hearts-pulse" 
                   style="background: linear-gradient(135deg, {iconBackgrounds.care.color}, {iconBackgrounds.care.secondary}); 
                          box-shadow: 0 8px 25px {iconBackgrounds.care.color}40;">
                <Heart class="h-8 w-8 text-white fill-current" />
              </div>
              <h3 class="heading text-xl font-medium mb-4" style="color: var(--text-primary);">{$t('home.howwegrow.step1.title')}</h3>
              <p style="color: var(--text-secondary);">
                {$t('home.howwegrow.step1.description')}
              </p>
            </div>
          </div>

          <!-- Step 2 -->
          <div class="text-center">
            <div class="card">
              <div class="color-shifting-icon flex items-center justify-center h-16 w-16 rounded-full mx-auto mb-6" 
                   style="background: linear-gradient(135deg, {iconBackgrounds.healing.color}, {iconBackgrounds.healing.secondary}); 
                          box-shadow: 0 8px 25px {iconBackgrounds.healing.color}40;">
                <Users class="h-8 w-8 text-white" />
              </div>
              <h3 class="heading text-xl font-medium mb-4" style="color: var(--text-primary);">{$t('home.howwegrow.step2.title')}</h3>
              <p style="color: var(--text-secondary);">
                {$t('home.howwegrow.step2.description')}
              </p>
            </div>
          </div>

          <!-- Step 3 -->
          <div class="text-center">
            <div class="card">
              <div class="color-shifting-icon flex items-center justify-center h-16 w-16 rounded-full mx-auto mb-6 leaves-sway" 
                   style="background: linear-gradient(135deg, {iconBackgrounds.ecology.color}, {iconBackgrounds.ecology.secondary}); 
                          box-shadow: 0 8px 25px {iconBackgrounds.ecology.color}40;">
                <TreePine class="h-8 w-8 text-white" />
              </div>
              <h3 class="heading text-xl font-medium mb-4" style="color: var(--text-primary);">{$t('home.howwegrow.step3.title')}</h3>
              <p style="color: var(--text-secondary);">
                {$t('home.howwegrow.step3.description')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Values Section -->
  <div class="py-20" style="background: var(--bg-primary);">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="lg:text-center">
        <h2 class="heading text-base font-semibold tracking-wide uppercase" style="color: var(--vibrant-purple);">{$t('home.values.title')}</h2>
        <p class="heading mt-2 text-3xl leading-8 font-bold tracking-tight sm:text-4xl" style="color: var(--text-primary);">
          {$t('home.values.subtitle')}
        </p>
        <p class="mt-4 max-w-2xl text-xl lg:mx-auto" style="color: var(--text-secondary);">
          {$t('home.values.description')}
        </p>
      </div>

      <div class="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
        <!-- Value 1 -->
        <div class="text-center">
          <div class="card">
            <div class="mb-4">
              <div class="color-shifting-icon h-12 w-12 mx-auto rounded-full flex items-center justify-center" 
                   style="background: linear-gradient(135deg, {iconBackgrounds.community.color}, {iconBackgrounds.community.secondary});">
                <Users class="h-6 w-6 text-white" />
              </div>
            </div>
            <h3 class="heading text-lg font-medium mb-2" style="color: var(--text-primary);">{$t('home.values.communityheld.title')}</h3>
            <p class="text-sm" style="color: var(--text-secondary);">
              {$t('home.values.communityheld.description')}
            </p>
          </div>
        </div>

        <!-- Value 2 -->
        <div class="text-center">
          <div class="card">
            <div class="mb-4">
              <div class="color-shifting-icon h-12 w-12 mx-auto rounded-full flex items-center justify-center" 
                   style="background: linear-gradient(135deg, {iconBackgrounds.ecology.color}, {iconBackgrounds.ecology.secondary});">
                <TreePine class="h-6 w-6 text-white" />
              </div>
            </div>
            <h3 class="heading text-lg font-medium mb-2" style="color: var(--text-primary);">{$t('home.values.indigenousguided.title')}</h3>
            <p class="text-sm" style="color: var(--text-secondary);">
              {$t('home.values.indigenousguided.description')}
            </p>
          </div>
        </div>

        <!-- Value 3 -->
        <div class="text-center">
          <div class="card">
            <div class="mb-4">
              <div class="color-shifting-icon h-12 w-12 mx-auto rounded-full flex items-center justify-center" 
                   style="background: linear-gradient(135deg, {iconBackgrounds.care.color}, {iconBackgrounds.care.secondary});">
                <Heart class="h-6 w-6 text-white fill-current" />
              </div>
            </div>
            <h3 class="heading text-lg font-medium mb-2" style="color: var(--text-primary);">{$t('home.values.carecentered.title')}</h3>
            <p class="text-sm" style="color: var(--text-secondary);">
              {$t('home.values.carecentered.description')}
            </p>
          </div>
        </div>

        <!-- Value 4 -->
        <div class="text-center">
          <div class="card">
            <div class="mb-4">
              <div class="color-shifting-icon h-12 w-12 mx-auto rounded-full flex items-center justify-center" 
                   style="background: linear-gradient(135deg, {iconBackgrounds.earth.color}, {iconBackgrounds.earth.secondary});">
                <Globe class="h-6 w-6 text-white" />
              </div>
            </div>
            <h3 class="heading text-lg font-medium mb-2" style="color: var(--text-primary);">{$t('home.values.earthhonoring.title')}</h3>
            <p class="text-sm" style="color: var(--text-secondary);">
              {$t('home.values.earthhonoring.description')}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Footer -->
  <footer style="background: var(--bg-secondary); color: var(--text-primary); border-top: 1px solid var(--border-subtle);">
    <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
      <div class="flex justify-center space-x-6 md:order-2">
        <a href="/about" class="hover:opacity-75 transition-opacity" style="color: var(--text-secondary);">
          {$t('home.footer.aboutstory')}
        </a>
        <a href="/privacy" class="hover:opacity-75 transition-opacity" style="color: var(--text-secondary);">
          {$t('home.footer.sacredagreements')}
        </a>
        <a href="/contact" class="hover:opacity-75 transition-opacity" style="color: var(--text-secondary);">
          {$t('home.footer.connectwithus')}
        </a>
      </div>
      <div class="mt-8 md:mt-0 md:order-1">
        <div class="flex items-center justify-center md:justify-start">
          <div class="color-shifting-icon p-1 rounded-full" 
               style="background: linear-gradient(135deg, {iconBackgrounds.care.color}, {iconBackgrounds.care.secondary});">
            <Heart class="h-6 w-6 text-white fill-current hearts-pulse" />
          </div>
          <span class="ml-2" style="color: var(--text-secondary);">
            {$t('home.footer.tagline')}
          </span>
        </div>
      </div>
    </div>
  </footer>
</div>

<style>
  .color-shifting-icon {
    position: relative;
    overflow: hidden;
    transition: all 0.3s ease;
  }
  
  .color-shifting-icon::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    transition: left 0.6s ease;
  }
  
  .color-shifting-icon:hover::before {
    left: 100%;
  }
  
  .color-shifting-icon:hover {
    transform: scale(1.05);
    filter: brightness(1.1);
  }
</style>
