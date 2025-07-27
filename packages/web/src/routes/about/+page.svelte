<!-- src/routes/about/+page.svelte -->
<script lang="ts">
  import { Heart, TreePine, Users, Globe, Sparkles, ArrowRight, Compass, Sprout, Waves } from 'lucide-svelte';
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { t, loadTranslations, detectLocale } from '$lib/i18n';
  import { simpleMarkdownToHTML } from '$lib/utils/markdown';
  import ColorShiftingHeart from '$lib/components/ColorShiftingHeart.svelte';
  
  // Load translations on mount
  onMount(async () => {
    const locale = detectLocale();
    await loadTranslations(locale, $page.url.pathname);
  });
  
  // Icon backgrounds for different sections
  const iconBackgrounds = {
    care: { color: '#ef4444', secondary: '#dc2626' },
    ecology: { color: '#22c55e', secondary: '#16a34a' },  
    community: { color: '#fbbf24', secondary: '#f59e0b' },
    wisdom: { color: '#8b5cf6', secondary: '#7c3aed' },
    earth: { color: '#92400e', secondary: '#78350f' },
    spirit: { color: '#06b6d4', secondary: '#0891b2' }
  };
</script>

<svelte:head>
  <title>{$t('about.hero.heading')} - {$t('common.site.title')}</title>
  <meta name="description" content={$t('about.hero.description')} />
</svelte:head>

<div class="min-h-screen">
  <!-- Hero Section -->
  <div class="hero-section relative overflow-hidden">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div class="text-center">
        <!-- Animated Heart Logo -->
        <div class="flex justify-center mb-8">
          <div class="color-shifting-icon p-6 rounded-3xl backdrop-filter backdrop-blur-lg" 
               style="background: var(--gradient-hearts-rainbow); box-shadow: var(--shadow-strong);">
            <ColorShiftingHeart size="xl" speed="slow" />
          </div>
        </div>
        
        <h1 class="heading text-4xl md:text-6xl font-bold mb-6" style="color: var(--text-primary);">
          {$t('about.hero.heading')}
        </h1>
        <p class="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed" style="color: var(--text-secondary);">
          {$t('about.hero.description')}
        </p>
      </div>
    </div>
  </div>

  <!-- Story of Separation Section -->
  <section class="py-20" style="background: var(--bg-secondary);">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <div class="color-shifting-icon inline-flex p-4 rounded-2xl mb-6" 
             style="background: linear-gradient(135deg, {iconBackgrounds.spirit.color}, {iconBackgrounds.spirit.secondary}); 
                    box-shadow: 0 8px 30px {iconBackgrounds.spirit.color}40;">
          <Waves class="h-8 w-8 text-white" />
        </div>
        <h2 class="heading text-3xl md:text-4xl font-bold mb-8" style="color: var(--text-primary);">
          {$t('about.problem.heading')}
        </h2>
      </div>
      
      <div class="space-y-8">
        <div class="card">
          <p class="text-lg leading-relaxed" style="color: var(--text-secondary);">
            {$t('about.problem.paragraph1')}
          </p>
        </div>
        <div class="card">
          <p class="text-lg leading-relaxed" style="color: var(--text-secondary);">
            {$t('about.problem.paragraph2')}
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- Vision Section -->
  <section class="py-20" style="background: var(--bg-primary);">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <div class="color-shifting-icon inline-flex p-4 rounded-2xl mb-6 hearts-pulse" 
             style="background: linear-gradient(135deg, {iconBackgrounds.care.color}, {iconBackgrounds.care.secondary}); 
                    box-shadow: 0 8px 30px {iconBackgrounds.care.color}40;">
          <Heart class="h-8 w-8 text-white fill-current" />
        </div>
        <h2 class="heading text-3xl md:text-4xl font-bold mb-8" style="color: var(--text-primary);">
          {$t('about.vision.heading')}
        </h2>
      </div>
      
      <div class="space-y-8">
        <div class="card">
          <p class="text-lg leading-relaxed" style="color: var(--text-secondary);">
            {$t('about.vision.paragraph1')}
          </p>
        </div>
        <div class="card">
          <p class="text-lg leading-relaxed" style="color: var(--text-secondary);">
            {$t('about.vision.paragraph2')}
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- How It Works Section -->
  <section class="py-20" style="background: var(--bg-secondary);">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <div class="color-shifting-icon inline-flex p-4 rounded-2xl mb-6 leaves-sway" 
             style="background: linear-gradient(135deg, {iconBackgrounds.ecology.color}, {iconBackgrounds.ecology.secondary}); 
                    box-shadow: 0 8px 30px {iconBackgrounds.ecology.color}40;">
          <TreePine class="h-8 w-8 text-white" />
        </div>
        <h2 class="heading text-3xl md:text-4xl font-bold mb-8" style="color: var(--text-primary);">
          {$t('about.howitworks.heading')}
        </h2>
      </div>
      
      <div class="space-y-8">
        <div class="card">
          <p class="text-lg leading-relaxed" style="color: var(--text-secondary);">
            {@html simpleMarkdownToHTML($t('about.howitworks.paragraph1'))}
          </p>
        </div>
        <div class="card">
          <p class="text-lg leading-relaxed" style="color: var(--text-secondary);">
            {@html simpleMarkdownToHTML($t('about.howitworks.paragraph2'))}
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- Origin Story Section -->
  <section class="py-20" style="background: var(--bg-primary);">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <div class="color-shifting-icon inline-flex p-4 rounded-2xl mb-6" 
             style="background: linear-gradient(135deg, {iconBackgrounds.wisdom.color}, {iconBackgrounds.wisdom.secondary}); 
                    box-shadow: 0 8px 30px {iconBackgrounds.wisdom.color}40;">
          <Sprout class="h-8 w-8 text-white" />
        </div>
        <h2 class="heading text-3xl md:text-4xl font-bold mb-8" style="color: var(--text-primary);">
          {$t('about.origin.heading')}
        </h2>
      </div>
      
      <div class="space-y-8">
        <div class="card">
          <p class="text-lg leading-relaxed" style="color: var(--text-secondary);">
            {$t('about.origin.paragraph1')}
          </p>
        </div>
        <div class="card">
          <p class="text-lg leading-relaxed" style="color: var(--text-secondary);">
            {$t('about.origin.paragraph2')}
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- Sacred Agreements Section -->
  <section class="py-20" style="background: var(--bg-secondary);">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="heading text-3xl md:text-4xl font-bold mb-4" style="color: var(--text-primary);">
          {$t('about.principles.title')}
        </h2>
        <p class="text-lg" style="color: var(--text-secondary);">
          {$t('about.principles.description')}
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <!-- Community Held -->
        <div class="text-center">
          <div class="card">
            <div class="mb-6">
              <div class="color-shifting-icon h-16 w-16 mx-auto rounded-2xl flex items-center justify-center" 
                   style="background: linear-gradient(135deg, {iconBackgrounds.community.color}, {iconBackgrounds.community.secondary});">
                <Users class="h-8 w-8 text-white" />
              </div>
            </div>
            <h3 class="heading text-xl font-semibold mb-4" style="color: var(--text-primary);">
              {$t('about.principles.communityheld.title')}
            </h3>
            <p style="color: var(--text-secondary);">
              {$t('about.principles.communityheld.description')}
            </p>
          </div>
        </div>

        <!-- Indigenous Guided -->
        <div class="text-center">
          <div class="card">
            <div class="mb-6">
              <div class="color-shifting-icon h-16 w-16 mx-auto rounded-2xl flex items-center justify-center" 
                   style="background: linear-gradient(135deg, {iconBackgrounds.wisdom.color}, {iconBackgrounds.wisdom.secondary});">
                <Compass class="h-8 w-8 text-white" />
              </div>
            </div>
            <h3 class="heading text-xl font-semibold mb-4" style="color: var(--text-primary);">
              {$t('about.principles.indigenousguided.title')}
            </h3>
            <p style="color: var(--text-secondary);">
              {$t('about.principles.indigenousguided.description')}
            </p>
          </div>
        </div>

        <!-- Care Centered -->
        <div class="text-center">
          <div class="card">
            <div class="mb-6">
              <div class="color-shifting-icon h-16 w-16 mx-auto rounded-2xl flex items-center justify-center hearts-pulse" 
                   style="background: linear-gradient(135deg, {iconBackgrounds.care.color}, {iconBackgrounds.care.secondary});">
                <Heart class="h-8 w-8 text-white fill-current" />
              </div>
            </div>
            <h3 class="heading text-xl font-semibold mb-4" style="color: var(--text-primary);">
              {$t('about.principles.carecentered.title')}
            </h3>
            <p style="color: var(--text-secondary);">
              {$t('about.principles.carecentered.description')}
            </p>
          </div>
        </div>

        <!-- Earth Honoring -->
        <div class="text-center">
          <div class="card">
            <div class="mb-6">
              <div class="color-shifting-icon h-16 w-16 mx-auto rounded-2xl flex items-center justify-center leaves-sway" 
                   style="background: linear-gradient(135deg, {iconBackgrounds.earth.color}, {iconBackgrounds.earth.secondary});">
                <Globe class="h-8 w-8 text-white" />
              </div>
            </div>
            <h3 class="heading text-xl font-semibold mb-4" style="color: var(--text-primary);">
              {$t('about.principles.earthhonoring.title')}
            </h3>
            <p style="color: var(--text-secondary);">
              {$t('about.principles.earthhonoring.description')}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Join the Weaving Section -->
  <section class="py-20" style="background: var(--bg-primary);">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <div class="mb-12">
        <div class="color-shifting-icon inline-flex p-4 rounded-2xl mb-6" 
             style="background: var(--gradient-hearts-rainbow); box-shadow: var(--shadow-medium);">
          <Sparkles class="h-8 w-8 text-white" />
        </div>
        <h2 class="heading text-3xl md:text-4xl font-bold mb-8" style="color: var(--text-primary);">
          {$t('about.invitation.heading')}
        </h2>
      </div>
      
      <div class="card mb-12">
        <p class="text-lg leading-relaxed" style="color: var(--text-secondary);">
          {$t('about.invitation.paragraph1')}
        </p>
      </div>

      <!-- Call to Action Buttons -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <a href="/contact" class="btn-primary flex items-center">
          {$t('about.invitation.cta')}
          <ArrowRight class="ml-2 h-5 w-5" />
        </a>
        <a href="https://github.com/GlobalGovernanceFrameworks" 
           target="_blank" 
           rel="noopener noreferrer" 
           class="btn-secondary flex items-center">
          View on GitHub
          <ArrowRight class="ml-2 h-5 w-5" />
        </a>
      </div>
    </div>
  </section>
</div>

<style>
  /* Enhanced card hover effects for the about page */
  .card:hover {
    transform: translateY(-6px) scale(1.02);
    box-shadow: var(--shadow-strong);
  }
  
  /* Staggered animation for principle cards */
  .grid > div:nth-child(1) .card { animation-delay: 0.1s; }
  .grid > div:nth-child(2) .card { animation-delay: 0.2s; }
  .grid > div:nth-child(3) .card { animation-delay: 0.3s; }
  .grid > div:nth-child(4) .card { animation-delay: 0.4s; }
  
  /* Smooth reveal animation */
  @keyframes reveal {
    from { 
      opacity: 0; 
      transform: translateY(20px); 
    }
    to { 
      opacity: 1; 
      transform: translateY(0); 
    }
  }
  
  .card {
    animation: reveal 0.6s ease-out forwards;
    animation-fill-mode: both;
  }
  
  /* Enhanced color-shifting effects for about page */
  .color-shifting-icon:hover {
    transform: scale(1.1) rotate(5deg);
    filter: brightness(1.2) saturate(1.3);
  }
  
  /* Typography enhancements */
  .heading {
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  /* Responsive text sizing */
  @media (max-width: 640px) {
    h1 {
      font-size: 2.5rem;
    }
    
    h2 {
      font-size: 2rem;
    }
    
    .text-xl {
      font-size: 1.125rem;
    }
  }
  
  /* Reduced motion support */
  @media (prefers-reduced-motion: reduce) {
    .card,
    .color-shifting-icon,
    .hearts-pulse,
    .leaves-sway {
      animation: none !important;
      transition: none !important;
    }
    
    .color-shifting-icon:hover {
      transform: none !important;
      filter: none !important;
    }
  }
</style>
