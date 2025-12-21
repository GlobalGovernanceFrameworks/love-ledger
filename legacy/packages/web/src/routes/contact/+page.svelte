<!-- src/routes/contact/+page.svelte -->
<script lang="ts">
  import { Mail, Heart, Code, Palette, Users, MapPin, Github, Sparkles } from 'lucide-svelte';
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { t, loadTranslations, detectLocale } from '$lib/i18n';
  import ColorShiftingHeart from '$lib/components/ColorShiftingHeart.svelte';
  
  // Load translations on mount
  onMount(async () => {
    const locale = detectLocale();
    await loadTranslations(locale, $page.url.pathname);
  });
  
  // Email obfuscation for spam protection
  let emailAddress = '';
  
  onMount(() => {
    // Construct email address client-side to avoid bots
    const parts = ['contact', 'globalgovernanceframeworks', 'org'];
    emailAddress = parts[0] + '@' + parts[1] + '.' + parts[2];
  });
  
  // Icon backgrounds for different sections
  const iconBackgrounds = {
    connection: { color: '#06b6d4', secondary: '#0891b2' },
    community: { color: '#fbbf24', secondary: '#f59e0b' },
    developer: { color: '#8b5cf6', secondary: '#7c3aed' },
    storyteller: { color: '#ec4899', secondary: '#db2777' },
    collaboration: { color: '#22c55e', secondary: '#16a34a' },
    github: { color: '#475569', secondary: '#334155' }
  };
  
  // Copy email to clipboard
  async function copyEmail() {
    if (emailAddress) {
      try {
        await navigator.clipboard.writeText(emailAddress);
        // Could add a toast notification here
        console.log('Email copied to clipboard');
      } catch (err) {
        console.error('Failed to copy email:', err);
      }
    }
  }
</script>

<svelte:head>
  <title>{$t('contact.page.title')} - {$t('common.site.title')}</title>
  <meta name="description" content={$t('contact.page.metaDescription')} />
</svelte:head>

<div class="min-h-screen">
  <!-- Hero Section -->
  <div class="hero-section relative overflow-hidden">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div class="text-center">
        <!-- Weaving Hearts Animation -->
        <div class="flex justify-center mb-8">
          <div class="relative">
            <!-- Central heart -->
            <div class="color-shifting-icon p-6 rounded-3xl backdrop-filter backdrop-blur-lg" 
                 style="background: var(--gradient-hearts-rainbow); box-shadow: var(--shadow-strong);">
              <ColorShiftingHeart size="xl" speed="slow" showTooltip={true} />
            </div>
            
            <!-- Orbiting smaller hearts -->
            <div class="absolute top-0 right-0 color-shifting-icon p-2 rounded-full" 
                 style="background: linear-gradient(135deg, {iconBackgrounds.community.color}, {iconBackgrounds.community.secondary}); 
                        animation: orbit 8s linear infinite;">
              <Heart class="h-4 w-4 text-white fill-current" />
            </div>
            <div class="absolute bottom-0 left-0 color-shifting-icon p-2 rounded-full" 
                 style="background: linear-gradient(135deg, {iconBackgrounds.collaboration.color}, {iconBackgrounds.collaboration.secondary}); 
                        animation: orbit 8s linear infinite reverse;">
              <Heart class="h-4 w-4 text-white fill-current" />
            </div>
          </div>
        </div>
        
        <h1 class="heading text-4xl md:text-6xl font-bold mb-6" style="color: var(--text-primary);">
          {$t('contact.hero.heading')}
        </h1>
        <p class="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed" style="color: var(--text-secondary);">
          {$t('contact.hero.description')}
        </p>
      </div>
    </div>
  </div>

  <!-- Primary Contact Section -->
  <section class="py-20" style="background: var(--bg-secondary);">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <div class="color-shifting-icon inline-flex p-4 rounded-2xl mb-6" 
             style="background: linear-gradient(135deg, {iconBackgrounds.connection.color}, {iconBackgrounds.connection.secondary}); 
                    box-shadow: 0 8px 30px {iconBackgrounds.connection.color}40;">
          <Mail class="h-8 w-8 text-white" />
        </div>
        <h2 class="heading text-3xl md:text-4xl font-bold mb-8" style="color: var(--text-primary);">
          {$t('contact.contactMethods.emailTitle')}
        </h2>
        <p class="text-lg max-w-3xl mx-auto mb-8" style="color: var(--text-secondary);">
          {$t('contact.contactMethods.emailDescription')}
        </p>
      </div>

      <!-- Email Contact Card -->
      <div class="card text-center">
        <div class="mb-6">
          <div class="color-shifting-icon inline-flex p-4 rounded-2xl mb-4" 
               style="background: var(--gradient-earth-vibrant); box-shadow: var(--shadow-medium);">
            <Mail class="h-8 w-8 text-white" />
          </div>
        </div>
        
        <!-- Email Address Display -->
        {#if emailAddress}
          <div class="space-y-4">
            <p class="text-2xl font-mono font-semibold" style="color: var(--text-primary);">
              {emailAddress}
            </p>
            
            <!-- Action Buttons -->
            <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a href="mailto:{emailAddress}" 
                 class="btn-primary flex items-center">
                <Mail class="h-5 w-5 mr-2" />
                Send Email
              </a>
              
              <button on:click={copyEmail}
                      class="btn-secondary flex items-center">
                <Sparkles class="h-5 w-5 mr-2" />
                Copy Address
              </button>
            </div>
          </div>
        {:else}
          <!-- Loading state while email constructs -->
          <div class="text-lg loading-email" style="color: var(--text-muted);">
            Preparing secure connection...
          </div>
        {/if}
      </div>
    </div>
  </section>

  <!-- Community Types Section -->
  <section class="py-20" style="background: var(--bg-primary);">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="heading text-3xl md:text-4xl font-bold mb-8" style="color: var(--text-primary);">
          Who We're Looking to Connect With
        </h2>
        <p class="text-lg max-w-3xl mx-auto" style="color: var(--text-secondary);">
          Whether you're building community, writing code, or weaving stories, there's a place for your gifts in this ecosystem.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Communities & BAZs -->
        <div class="card text-center">
          <div class="mb-6">
            <div class="color-shifting-icon h-16 w-16 mx-auto rounded-2xl flex items-center justify-center" 
                 style="background: linear-gradient(135deg, {iconBackgrounds.community.color}, {iconBackgrounds.community.secondary});">
              <Users class="h-8 w-8 text-white" />
            </div>
          </div>
          <h3 class="heading text-xl font-semibold mb-4" style="color: var(--text-primary);">
            {$t('contact.sections.0.title')}
          </h3>
          <p style="color: var(--text-secondary);">
            {$t('contact.sections.0.description')}
          </p>
          <div class="mt-6">
            <span class="inline-flex items-center px-3 py-2 rounded-full text-sm font-medium"
                  style="background: rgba(251, 191, 36, 0.1); color: var(--vibrant-yellow);">
              <MapPin class="h-4 w-4 mr-2" />
              BAZ Formation
            </span>
          </div>
        </div>

        <!-- Developers & Researchers -->
        <div class="card text-center">
          <div class="mb-6">
            <div class="color-shifting-icon h-16 w-16 mx-auto rounded-2xl flex items-center justify-center" 
                 style="background: linear-gradient(135deg, {iconBackgrounds.developer.color}, {iconBackgrounds.developer.secondary});">
              <Code class="h-8 w-8 text-white" />
            </div>
          </div>
          <h3 class="heading text-xl font-semibold mb-4" style="color: var(--text-primary);">
            {$t('contact.sections.1.title')}
          </h3>
          <p style="color: var(--text-secondary);">
            {$t('contact.sections.1.description')}
          </p>
          <div class="mt-6">
            <span class="inline-flex items-center px-3 py-2 rounded-full text-sm font-medium"
                  style="background: rgba(139, 92, 246, 0.1); color: var(--vibrant-purple);">
              <Github class="h-4 w-4 mr-2" />
              Open Source
            </span>
          </div>
        </div>

        <!-- Storytellers & Artists -->
        <div class="card text-center">
          <div class="mb-6">
            <div class="color-shifting-icon h-16 w-16 mx-auto rounded-2xl flex items-center justify-center" 
                 style="background: linear-gradient(135deg, {iconBackgrounds.storyteller.color}, {iconBackgrounds.storyteller.secondary});">
              <Palette class="h-8 w-8 text-white" />
            </div>
          </div>
          <h3 class="heading text-xl font-semibold mb-4" style="color: var(--text-primary);">
            {$t('contact.sections.2.title')}
          </h3>
          <p style="color: var(--text-secondary);">
            {$t('contact.sections.2.description')}
          </p>
          <div class="mt-6">
            <span class="inline-flex items-center px-3 py-2 rounded-full text-sm font-medium"
                  style="background: rgba(236, 72, 153, 0.1); color: var(--vibrant-purple);">
              <Heart class="h-4 w-4 mr-2 fill-current" />
              Creative Vision
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Secondary Resources Section -->
  <section class="py-20" style="background: var(--bg-secondary);">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <div class="mb-12">
        <h2 class="heading text-3xl md:text-4xl font-bold mb-8" style="color: var(--text-primary);">
          Explore & Connect
        </h2>
        <p class="text-lg" style="color: var(--text-secondary);">
          Dive deeper into our work and connect with the community
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- GitHub Repository -->
        <div class="card">
          <div class="flex items-center space-x-4 mb-4">
            <div class="color-shifting-icon p-3 rounded-xl" 
                 style="background: linear-gradient(135deg, {iconBackgrounds.github.color}, {iconBackgrounds.github.secondary});">
              <Github class="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 class="heading text-lg font-semibold" style="color: var(--text-primary);">
                Open Source Repository
              </h3>
              <p class="text-sm" style="color: var(--text-muted);">
                Explore the code, contribute, or star the project
              </p>
            </div>
          </div>
          <a href="https://github.com/GlobalGovernanceFrameworks" 
             target="_blank" 
             rel="noopener noreferrer" 
             class="btn-secondary w-full flex items-center justify-center">
            <Github class="h-4 w-4 mr-2" />
            View on GitHub
          </a>
        </div>

        <!-- Documentation -->
        <div class="card">
          <div class="flex items-center space-x-4 mb-4">
            <div class="color-shifting-icon p-3 rounded-xl" 
                 style="background: linear-gradient(135deg, {iconBackgrounds.collaboration.color}, {iconBackgrounds.collaboration.secondary});">
              <Sparkles class="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 class="heading text-lg font-semibold" style="color: var(--text-primary);">
                Framework Documentation
              </h3>
              <p class="text-sm" style="color: var(--text-muted);">
                Read the full specifications and implementation guides
              </p>
            </div>
          </div>
          <a href="https://globalgovernanceframeworks.org" 
             target="_blank" 
             rel="noopener noreferrer" 
             class="btn-secondary w-full flex items-center justify-center">
            <Sparkles class="h-4 w-4 mr-2" />
            Explore Frameworks
          </a>
        </div>
      </div>
    </div>
  </section>
</div>

<style>
  /* Orbiting animation for small hearts */
  @keyframes orbit {
    from {
      transform: rotate(0deg) translateX(60px) rotate(0deg);
    }
    to {
      transform: rotate(360deg) translateX(60px) rotate(-360deg);
    }
  }
  
  /* Enhanced card hover effects */
  .card:hover {
    transform: translateY(-6px) scale(1.02);
    box-shadow: var(--shadow-strong);
  }
  
  /* Staggered animation for community type cards */
  .grid .card:nth-child(1) { animation-delay: 0.1s; }
  .grid .card:nth-child(2) { animation-delay: 0.2s; }
  .grid .card:nth-child(3) { animation-delay: 0.3s; }
  
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
    transform: scale(1.1) rotate(5deg) translateY(-8px);
    filter: brightness(1.2) saturate(1.3);
    z-index: 50;
    position: relative;
  }
  
  /* Email address styling */
  .font-mono {
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
    letter-spacing: 0.05em;
  }
  
  /* Button hover enhancements */
  .btn-primary:hover,
  .btn-secondary:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-medium);
  }
  
  /* Tag styling for specialties */
  .inline-flex[style*="background: rgba"] {
    transition: all 0.3s ease;
  }
  
  .inline-flex[style*="background: rgba"]:hover {
    transform: scale(1.05);
    filter: brightness(1.1);
  }
  
  /* Typography enhancements */
  .heading {
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  /* Loading state styling */
  .loading-email {
    animation: gentle-pulse 2s ease-in-out infinite;
  }
  
  @keyframes gentle-pulse {
    0%, 100% { opacity: 0.7; }
    50% { opacity: 1; }
  }
  
  /* Responsive design */
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
      gap: 1.5rem;
    }
    
    /* Simplify animations on mobile */
    @keyframes orbit {
      from { transform: rotate(0deg) translateX(40px) rotate(0deg); }
      to { transform: rotate(360deg) translateX(40px) rotate(-360deg); }
    }
  }
  
  /* Reduced motion support */
  @media (prefers-reduced-motion: reduce) {
    .card,
    .color-shifting-icon,
    .inline-flex,
    div[style*="animation: orbit"] {
      animation: none !important;
      transition: none !important;
    }
    
    .color-shifting-icon:hover {
      transform: none !important;
      filter: none !important;
    }
  }
  
  /* Focus states for accessibility */
  button:focus,
  a:focus {
    outline: 2px solid var(--vibrant-blue);
    outline-offset: 2px;
  }
</style>
