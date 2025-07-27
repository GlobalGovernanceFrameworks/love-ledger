<!-- src/routes/privacy/+page.svelte -->
<script lang="ts">
  import { Shield, Key, Download, Trash2, User, FileText, BarChart3, Users, Mail, Compass } from 'lucide-svelte';
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { t, loadTranslations, detectLocale } from '$lib/i18n';
  import ColorShiftingHeart from '$lib/components/ColorShiftingHeart.svelte';
  
  // Load translations on mount
  onMount(async () => {
    const locale = detectLocale();
    await loadTranslations(locale, $page.url.pathname);
  });
  
  // Icon backgrounds for different sections
  const iconBackgrounds = {
    protection: { color: '#475569', secondary: '#334155' },
    ownership: { color: '#8b5cf6', secondary: '#7c3aed' },
    access: { color: '#06b6d4', secondary: '#0891b2' },
    portability: { color: '#22c55e', secondary: '#16a34a' },
    erasure: { color: '#ef4444', secondary: '#dc2626' },
    account: { color: '#fbbf24', secondary: '#f59e0b' },
    contribution: { color: '#f97316', secondary: '#ea580c' },
    interaction: { color: '#6366f1', secondary: '#4f46e5' },
    community: { color: '#ec4899', secondary: '#db2777' },
    indigenous: { color: '#92400e', secondary: '#78350f' }
  };
</script>

<svelte:head>
  <title>{$t('privacy.page.title')} - {$t('common.site.title')}</title>
  <meta name="description" content={$t('privacy.page.metaDescription')} />
</svelte:head>

<div class="min-h-screen">
  <!-- Hero Section -->
  <div class="hero-section relative overflow-hidden">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div class="text-center">
        <!-- Trust Shield Icon -->
        <div class="flex justify-center mb-8">
          <div class="color-shifting-icon p-6 rounded-3xl backdrop-filter backdrop-blur-lg" 
               style="background: linear-gradient(135deg, {iconBackgrounds.protection.color}, {iconBackgrounds.protection.secondary}); 
                      box-shadow: var(--shadow-strong);">
            <Shield class="h-12 w-12 text-white" />
          </div>
        </div>
        
        <h1 class="heading text-4xl md:text-6xl font-bold mb-6" style="color: var(--text-primary);">
          {$t('privacy.hero.heading')}
        </h1>
        <p class="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed" style="color: var(--text-secondary);">
          {$t('privacy.hero.description')}
        </p>
      </div>
    </div>
  </div>

  <!-- Sovereign Rights Section -->
  <section class="py-20" style="background: var(--bg-secondary);">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <div class="color-shifting-icon inline-flex p-4 rounded-2xl mb-6" 
             style="background: linear-gradient(135deg, {iconBackgrounds.ownership.color}, {iconBackgrounds.ownership.secondary}); 
                    box-shadow: 0 8px 30px {iconBackgrounds.ownership.color}40;">
          <Key class="h-8 w-8 text-white" />
        </div>
        <h2 class="heading text-3xl md:text-4xl font-bold mb-8" style="color: var(--text-primary);">
          {$t('privacy.rights.heading')}
        </h2>
        <p class="text-lg max-w-3xl mx-auto" style="color: var(--text-secondary);">
          {$t('privacy.rights.description')}
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Right to Ownership -->
        <div class="card">
          <div class="flex items-start space-x-4">
            <div class="color-shifting-icon flex-shrink-0 p-3 rounded-xl" 
                 style="background: linear-gradient(135deg, {iconBackgrounds.ownership.color}, {iconBackgrounds.ownership.secondary});">
              <Key class="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 class="heading text-xl font-semibold mb-3" style="color: var(--text-primary);">
                {$t('privacy.rights.items.0.title')}
              </h3>
              <p style="color: var(--text-secondary);">
                {$t('privacy.rights.items.0.description')}
              </p>
            </div>
          </div>
        </div>

        <!-- Right to Control Access -->
        <div class="card">
          <div class="flex items-start space-x-4">
            <div class="color-shifting-icon flex-shrink-0 p-3 rounded-xl" 
                 style="background: linear-gradient(135deg, {iconBackgrounds.access.color}, {iconBackgrounds.access.secondary});">
              <Shield class="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 class="heading text-xl font-semibold mb-3" style="color: var(--text-primary);">
                {$t('privacy.rights.items.1.title')}
              </h3>
              <p style="color: var(--text-secondary);">
                {$t('privacy.rights.items.1.description')}
              </p>
            </div>
          </div>
        </div>

        <!-- Right to Portability -->
        <div class="card">
          <div class="flex items-start space-x-4">
            <div class="color-shifting-icon flex-shrink-0 p-3 rounded-xl" 
                 style="background: linear-gradient(135deg, {iconBackgrounds.portability.color}, {iconBackgrounds.portability.secondary});">
              <Download class="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 class="heading text-xl font-semibold mb-3" style="color: var(--text-primary);">
                {$t('privacy.rights.items.2.title')}
              </h3>
              <p style="color: var(--text-secondary);">
                {$t('privacy.rights.items.2.description')}
              </p>
            </div>
          </div>
        </div>

        <!-- Right to Erasure -->
        <div class="card">
          <div class="flex items-start space-x-4">
            <div class="color-shifting-icon flex-shrink-0 p-3 rounded-xl" 
                 style="background: linear-gradient(135deg, {iconBackgrounds.erasure.color}, {iconBackgrounds.erasure.secondary});">
              <Trash2 class="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 class="heading text-xl font-semibold mb-3" style="color: var(--text-primary);">
                {$t('privacy.rights.items.3.title')}
              </h3>
              <p style="color: var(--text-secondary);">
                {$t('privacy.rights.items.3.description')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Information Collection Section -->
  <section class="py-20" style="background: var(--bg-primary);">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <div class="color-shifting-icon inline-flex p-4 rounded-2xl mb-6" 
             style="background: linear-gradient(135deg, {iconBackgrounds.account.color}, {iconBackgrounds.account.secondary}); 
                    box-shadow: 0 8px 30px {iconBackgrounds.account.color}40;">
          <FileText class="h-8 w-8 text-white" />
        </div>
        <h2 class="heading text-3xl md:text-4xl font-bold mb-8" style="color: var(--text-primary);">
          {$t('privacy.collection.heading')}
        </h2>
        <p class="text-lg max-w-3xl mx-auto" style="color: var(--text-secondary);">
          {$t('privacy.collection.description')}
        </p>
      </div>

      <div class="space-y-8">
        <!-- Account Information -->
        <div class="card">
          <div class="flex items-start space-x-4">
            <div class="color-shifting-icon flex-shrink-0 p-3 rounded-xl" 
                 style="background: linear-gradient(135deg, {iconBackgrounds.account.color}, {iconBackgrounds.account.secondary});">
              <User class="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 class="heading text-xl font-semibold mb-3" style="color: var(--text-primary);">
                {$t('privacy.collection.items.0.title')}
              </h3>
              <p style="color: var(--text-secondary);">
                {$t('privacy.collection.items.0.description')}
              </p>
            </div>
          </div>
        </div>

        <!-- Contribution Data -->
        <div class="card">
          <div class="flex items-start space-x-4">
            <div class="color-shifting-icon flex-shrink-0 p-3 rounded-xl hearts-pulse" 
                 style="background: linear-gradient(135deg, {iconBackgrounds.contribution.color}, {iconBackgrounds.contribution.secondary});">
              <ColorShiftingHeart size="sm" category="care" />
            </div>
            <div>
              <h3 class="heading text-xl font-semibold mb-3" style="color: var(--text-primary);">
                {$t('privacy.collection.items.1.title')}
              </h3>
              <p style="color: var(--text-secondary);">
                {$t('privacy.collection.items.1.description')}
              </p>
            </div>
          </div>
        </div>

        <!-- Interaction Data -->
        <div class="card">
          <div class="flex items-start space-x-4">
            <div class="color-shifting-icon flex-shrink-0 p-3 rounded-xl" 
                 style="background: linear-gradient(135deg, {iconBackgrounds.interaction.color}, {iconBackgrounds.interaction.secondary});">
              <BarChart3 class="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 class="heading text-xl font-semibold mb-3" style="color: var(--text-primary);">
                {$t('privacy.collection.items.2.title')}
              </h3>
              <p style="color: var(--text-secondary);">
                {$t('privacy.collection.items.2.description')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Data Sharing Section -->
  <section class="py-20" style="background: var(--bg-secondary);">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <div class="color-shifting-icon inline-flex p-4 rounded-2xl mb-6" 
             style="background: linear-gradient(135deg, {iconBackgrounds.community.color}, {iconBackgrounds.community.secondary}); 
                    box-shadow: 0 8px 30px {iconBackgrounds.community.color}40;">
          <Users class="h-8 w-8 text-white" />
        </div>
        <h2 class="heading text-3xl md:text-4xl font-bold mb-8" style="color: var(--text-primary);">
          {$t('privacy.sharing.heading')}
        </h2>
        <p class="text-lg max-w-3xl mx-auto mb-8" style="color: var(--text-secondary);">
          {$t('privacy.sharing.description')}
        </p>
      </div>

      <div class="space-y-8">
        <div class="card">
          <p class="text-lg leading-relaxed" style="color: var(--text-secondary);">
            {$t('privacy.sharing.paragraph1')}
          </p>
        </div>
        <div class="card">
          <p class="text-lg leading-relaxed" style="color: var(--text-secondary);">
            {$t('privacy.sharing.paragraph2')}
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- Indigenous Data Sovereignty Section -->
  <section class="py-20" style="background: var(--bg-primary);">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <div class="color-shifting-icon inline-flex p-4 rounded-2xl mb-6" 
             style="background: linear-gradient(135deg, {iconBackgrounds.indigenous.color}, {iconBackgrounds.indigenous.secondary}); 
                    box-shadow: 0 8px 30px {iconBackgrounds.indigenous.color}40;">
          <Compass class="h-8 w-8 text-white" />
        </div>
        <h2 class="heading text-3xl md:text-4xl font-bold mb-8" style="color: var(--text-primary);">
          {$t('privacy.indigenousSovereignty.heading')}
        </h2>
      </div>

      <div class="card border-2" style="border-color: var(--vibrant-orange); background: rgba(146, 64, 14, 0.1);">
        <p class="text-lg leading-relaxed" style="color: var(--text-primary);">
          {$t('privacy.indigenousSovereignty.description')}
        </p>
      </div>
    </div>
  </section>

  <!-- Contact Section -->
  <section class="py-20" style="background: var(--bg-secondary);">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <div class="mb-12">
        <div class="color-shifting-icon inline-flex p-4 rounded-2xl mb-6" 
             style="background: var(--gradient-earth-vibrant); box-shadow: var(--shadow-medium);">
          <Mail class="h-8 w-8 text-white" />
        </div>
        <h2 class="heading text-3xl md:text-4xl font-bold mb-8" style="color: var(--text-primary);">
          {$t('privacy.contact.heading')}
        </h2>
      </div>
      
      <div class="card mb-8">
        <p class="text-lg leading-relaxed mb-6" style="color: var(--text-secondary);">
          {$t('privacy.contact.description')}
        </p>
        
        <a href="mailto:{$t('privacy.contact.email')}" 
           class="btn-primary inline-flex items-center">
          <Mail class="h-5 w-5 mr-2" />
          {$t('privacy.contact.email')}
        </a>
      </div>

      <!-- Trust Indicators -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        <div class="text-center">
          <div class="color-shifting-icon h-12 w-12 mx-auto rounded-xl flex items-center justify-center mb-4" 
               style="background: linear-gradient(135deg, {iconBackgrounds.protection.color}, {iconBackgrounds.protection.secondary});">
            <Shield class="h-6 w-6 text-white" />
          </div>
          <h3 class="heading text-sm font-semibold" style="color: var(--text-primary);">Privacy First</h3>
        </div>
        
        <div class="text-center">
          <div class="color-shifting-icon h-12 w-12 mx-auto rounded-xl flex items-center justify-center mb-4" 
               style="background: linear-gradient(135deg, {iconBackgrounds.ownership.color}, {iconBackgrounds.ownership.secondary});">
            <Key class="h-6 w-6 text-white" />
          </div>
          <h3 class="heading text-sm font-semibold" style="color: var(--text-primary);">Your Data, Your Keys</h3>
        </div>
        
        <div class="text-center">
          <div class="color-shifting-icon h-12 w-12 mx-auto rounded-xl flex items-center justify-center mb-4" 
               style="background: linear-gradient(135deg, {iconBackgrounds.community.color}, {iconBackgrounds.community.secondary});">
            <Users class="h-6 w-6 text-white" />
          </div>
          <h3 class="heading text-sm font-semibold" style="color: var(--text-primary);">Community Governed</h3>
        </div>
      </div>
    </div>
  </section>
</div>

<style>
  /* Enhanced card hover effects for the privacy page */
  .card:hover {
    transform: translateY(-4px) scale(1.02);
    box-shadow: var(--shadow-strong);
  }
  
  /* Staggered animation for rights cards */
  .grid .card:nth-child(1) { animation-delay: 0.1s; }
  .grid .card:nth-child(2) { animation-delay: 0.2s; }
  .grid .card:nth-child(3) { animation-delay: 0.3s; }
  .grid .card:nth-child(4) { animation-delay: 0.4s; }
  
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
  
  /* Enhanced color-shifting effects */
  .color-shifting-icon:hover {
    transform: scale(1.1) rotate(3deg);
    filter: brightness(1.2) saturate(1.3);
  }
  
  /* Special styling for indigenous sovereignty section */
  section:nth-of-type(4) .card {
    position: relative;
    overflow: hidden;
  }
  
  section:nth-of-type(4) .card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, var(--vibrant-orange), var(--earth-bark));
    opacity: 0.8;
  }
  
  /* Typography enhancements */
  .heading {
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  /* Trust indicators animation */
  .grid > div:last-child .color-shifting-icon {
    animation: gentle-pulse 3s ease-in-out infinite;
  }
  
  @keyframes gentle-pulse {
    0%, 100% { 
      opacity: 0.9; 
      transform: scale(1);
    }
    50% { 
      opacity: 1; 
      transform: scale(1.05);
    }
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
    
    .grid {
      grid-template-columns: 1fr;
    }
  }
  
  /* Reduced motion support */
  @media (prefers-reduced-motion: reduce) {
    .card,
    .color-shifting-icon,
    .hearts-pulse {
      animation: none !important;
      transition: none !important;
    }
    
    .color-shifting-icon:hover {
      transform: none !important;
      filter: none !important;
    }
  }
  
  /* Email link styling */
  a[href^="mailto:"] {
    transition: all 0.3s ease;
  }
  
  a[href^="mailto:"]:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-medium);
  }
</style>
