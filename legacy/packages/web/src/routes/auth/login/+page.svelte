<!-- src/routes/auth/login/+page.svelte -->
<script lang="ts">
  import { enhance } from '$app/forms';
  import { Heart, Mail, Lock, ArrowRight } from 'lucide-svelte';
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { t, loadTranslations, detectLocale } from '$lib/i18n';
  import ColorShiftingHeart from '$lib/components/ColorShiftingHeart.svelte';
  
  export let form;
  
  // Load translations on mount
  onMount(async () => {
    const locale = detectLocale();
    await loadTranslations(locale, $page.url.pathname);
  });
</script>

<svelte:head>
  <title>{$t('auth.login.pageTitle')} - {$t('common.site.title')}</title>
  <meta name="description" content={$t('auth.login.metaDescription')} />
</svelte:head>

<div class="min-h-screen flex items-center justify-center hero-section py-12 px-4 sm:px-6 lg:px-8">
  <div class="max-w-md w-full space-y-8">
    <!-- Header with Color-Shifting Heart -->
    <div class="text-center">
      <div class="flex justify-center">
        <div class="p-4 rounded-2xl backdrop-filter backdrop-blur-lg color-shifting-icon" 
             style="background: var(--gradient-earth-vibrant); box-shadow: var(--shadow-medium);">
          <ColorShiftingHeart size="lg" category="care" />
        </div>
      </div>
      <h2 class="heading mt-6 text-3xl font-bold" style="color: var(--text-primary);">
        {$t('auth.login.welcomeBack')}
      </h2>
      <p class="mt-2 text-sm" style="color: var(--text-muted);">
        {$t('auth.login.subtitle')}
      </p>
    </div>

    <!-- Login Form with Adaptive Styling -->
    <form method="POST" use:enhance class="mt-8 space-y-6">
      {#if form?.message}
        <div class="card border-2" 
             style="border-color: var(--vibrant-orange); background: rgba(251, 146, 60, 0.1);">
          <p style="color: var(--vibrant-orange);">{form.message}</p>
        </div>
      {/if}

      <div class="space-y-4">
        <!-- Email -->
        <div>
          <label for="email" class="block text-sm font-medium heading" style="color: var(--text-primary);">
            {$t('auth.login.emailLabel')}
          </label>
          <div class="mt-1 relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail class="h-5 w-5" style="color: var(--text-muted);" />
            </div>
            <input
              id="email"
              name="email"
              type="email"
              autocomplete="email"
              required
              class="block w-full pl-10 pr-3 py-3 border-2 rounded-2xl transition-all duration-200 focus:outline-none focus:ring-0"
              style="border-color: var(--border-medium); 
                     background: var(--bg-card); 
                     color: var(--text-primary);
                     backdrop-filter: blur(10px);"
              placeholder={$t('auth.login.emailPlaceholder')}
              value={form?.data?.email || ''}
            />
          </div>
          {#if form?.errors?.email}
            <p class="mt-1 text-sm" style="color: var(--vibrant-red);">{form.errors.email[0]}</p>
          {/if}
        </div>

        <!-- Password -->
        <div>
          <label for="password" class="block text-sm font-medium heading" style="color: var(--text-primary);">
            {$t('auth.login.passwordLabel')}
          </label>
          <div class="mt-1 relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock class="h-5 w-5" style="color: var(--text-muted);" />
            </div>
            <input
              id="password"
              name="password"
              type="password"
              autocomplete="current-password"
              required
              class="block w-full pl-10 pr-3 py-3 border-2 rounded-2xl transition-all duration-200 focus:outline-none focus:ring-0"
              style="border-color: var(--border-medium); 
                     background: var(--bg-card); 
                     color: var(--text-primary);
                     backdrop-filter: blur(10px);"
              placeholder={$t('auth.login.passwordPlaceholder')}
            />
          </div>
          {#if form?.errors?.password}
            <p class="mt-1 text-sm" style="color: var(--vibrant-red);">{form.errors.password[0]}</p>
          {/if}
        </div>

        <!-- Forgot Password Link -->
        <div class="text-right">
          <a href="/auth/forgot-password" 
             class="text-sm font-medium transition-colors hover:opacity-80" 
             style="color: var(--vibrant-green);">
            {$t('auth.login.forgotPassword')}
          </a>
        </div>
      </div>

      <!-- Submit Button -->
      <button type="submit" class="btn-primary w-full flex items-center justify-center py-3 group">
        <span class="flex items-center">
          {$t('auth.login.signInButton')}
          <ArrowRight class="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </button>

      <!-- Register Link -->
      <div class="text-center">
        <p class="text-sm" style="color: var(--text-muted);">
          {$t('auth.login.newToCommunity')}
          <a href="/auth/register" 
             class="font-medium transition-colors hover:opacity-80" 
             style="color: var(--vibrant-green);">
            {$t('auth.login.joinCircle')}
          </a>
        </p>
      </div>

      <!-- Divider -->
      <div class="relative my-6">
        <div class="absolute inset-0 flex items-center">
          <div class="w-full border-t" style="border-color: var(--border-subtle);"></div>
        </div>
        <div class="relative flex justify-center text-sm">
          <span class="px-4 text-sm" style="background: var(--bg-primary); color: var(--text-muted);">
            {$t('auth.login.orContinueWith')}
          </span>
        </div>
      </div>

      <!-- Social Login Placeholder -->
      <div class="space-y-3">
        <button type="button" 
                class="btn-secondary w-full flex items-center justify-center py-3"
                disabled>
          <Heart class="h-4 w-4 mr-2 hearts-pulse" />
          {$t('auth.login.communityInvite')}
        </button>
        <p class="text-xs text-center" style="color: var(--text-muted);">
          {$t('auth.login.inviteOnlyNote')}
        </p>
      </div>
    </form>
  </div>
</div>

<style>
  /* Input focus states with adaptive colors */
  input:focus {
    border-color: var(--vibrant-green) !important;
    box-shadow: 0 0 20px rgba(34, 197, 94, 0.3) !important;
    background: var(--bg-card-hover) !important;
  }
  
  input::placeholder {
    color: var(--text-muted) !important;
  }
  
  /* Enhanced button hover effects */
  .btn-primary:hover {
    background: var(--gradient-sunset-energy) !important;
    transform: translateY(-2px) scale(1.02) !important;
  }
  
  .btn-secondary:hover {
    background: var(--vibrant-green) !important;
    color: white !important;
  }
  
  /* Smooth transitions for all interactive elements */
  a {
    transition: all 0.2s ease;
  }
  
  a:hover {
    filter: brightness(1.1);
  }
</style>
