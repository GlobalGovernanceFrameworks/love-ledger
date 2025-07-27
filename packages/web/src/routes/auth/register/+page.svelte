<!-- src/routes/auth/register/+page.svelte -->
<script lang="ts">
  import { enhance } from '$app/forms';
  import { Heart, Mail, Lock, User, MapPin, ArrowRight, Check } from 'lucide-svelte';
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
  
  // Password strength indicator
  let password = '';
  $: passwordStrength = calculatePasswordStrength(password);
  
  function calculatePasswordStrength(pwd: string) {
    if (!pwd) return 0;
    let strength = 0;
    if (pwd.length >= 8) strength += 25;
    if (/[a-z]/.test(pwd)) strength += 25;
    if (/[A-Z]/.test(pwd)) strength += 25;
    if (/[0-9]/.test(pwd)) strength += 25;
    return strength;
  }
  
  function getStrengthColor(strength: number) {
    if (strength < 50) return 'var(--vibrant-red)';
    if (strength < 75) return 'var(--vibrant-orange)';
    return 'var(--vibrant-green)';
  }
  
  function getStrengthText(strength: number) {
    if (strength < 25) return $t('auth.register.passwordWeak');
    if (strength < 50) return $t('auth.register.passwordFair');
    if (strength < 75) return $t('auth.register.passwordGood');
    return $t('auth.register.passwordStrong');
  }
</script>

<svelte:head>
  <title>{$t('auth.register.pageTitle')} - {$t('common.site.title')}</title>
  <meta name="description" content={$t('auth.register.metaDescription')} />
</svelte:head>

<div class="min-h-screen flex items-center justify-center hero-section py-12 px-4 sm:px-6 lg:px-8">
  <div class="max-w-md w-full space-y-8">
    <!-- Header with Color-Shifting Heart -->
    <div class="text-center">
      <div class="flex justify-center">
        <div class="p-4 rounded-2xl backdrop-filter backdrop-blur-lg color-shifting-icon" 
             style="background: var(--gradient-earth-vibrant); box-shadow: var(--shadow-medium);">
          <ColorShiftingHeart size="lg" category="community" />
        </div>
      </div>
      <h2 class="heading mt-6 text-3xl font-bold" style="color: var(--text-primary);">
        {$t('auth.register.joinCircle')}
      </h2>
      <p class="mt-2 text-sm" style="color: var(--text-muted);">
        {$t('auth.register.subtitle')}
      </p>
    </div>

    <!-- Registration Form with Adaptive Styling -->
    <form method="POST" use:enhance class="mt-8 space-y-6">
      {#if form?.message}
        <div class="card border-2" 
             style="border-color: var(--vibrant-orange); background: rgba(251, 146, 60, 0.1);">
          <p style="color: var(--vibrant-orange);">{form.message}</p>
        </div>
      {/if}

      <div class="space-y-4">
        <!-- Display Name -->
        <div>
          <label for="displayName" class="block text-sm font-medium heading" style="color: var(--text-primary);">
            {$t('auth.register.displayNameLabel')}
          </label>
          <div class="mt-1 relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User class="h-5 w-5" style="color: var(--text-muted);" />
            </div>
            <input
              id="displayName"
              name="displayName"
              type="text"
              required
              class="block w-full pl-10 pr-3 py-3 border-2 rounded-2xl transition-all duration-200 focus:outline-none focus:ring-0"
              style="border-color: var(--border-medium); 
                     background: var(--bg-card); 
                     color: var(--text-primary);
                     backdrop-filter: blur(10px);"
              placeholder={$t('auth.register.displayNamePlaceholder')}
              value={form?.data?.displayName || ''}
            />
          </div>
          {#if form?.errors?.displayName}
            <p class="mt-1 text-sm" style="color: var(--vibrant-red);">{form.errors.displayName[0]}</p>
          {/if}
        </div>

        <!-- Email -->
        <div>
          <label for="email" class="block text-sm font-medium heading" style="color: var(--text-primary);">
            {$t('auth.register.emailLabel')}
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
              placeholder={$t('auth.register.emailPlaceholder')}
              value={form?.data?.email || ''}
            />
          </div>
          {#if form?.errors?.email}
            <p class="mt-1 text-sm" style="color: var(--vibrant-red);">{form.errors.email[0]}</p>
          {/if}
        </div>

        <!-- Password with Strength Indicator -->
        <div>
          <label for="password" class="block text-sm font-medium heading" style="color: var(--text-primary);">
            {$t('auth.register.passwordLabel')}
          </label>
          <div class="mt-1 relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock class="h-5 w-5" style="color: var(--text-muted);" />
            </div>
            <input
              id="password"
              name="password"
              type="password"
              autocomplete="new-password"
              required
              bind:value={password}
              class="block w-full pl-10 pr-3 py-3 border-2 rounded-2xl transition-all duration-200 focus:outline-none focus:ring-0"
              style="border-color: var(--border-medium); 
                     background: var(--bg-card); 
                     color: var(--text-primary);
                     backdrop-filter: blur(10px);"
              placeholder={$t('auth.register.passwordPlaceholder')}
            />
          </div>
          
          <!-- Password Strength Indicator -->
          {#if password}
            <div class="mt-2">
              <div class="flex items-center justify-between mb-1">
                <span class="text-xs" style="color: var(--text-muted);">
                  {$t('auth.register.passwordStrength')}
                </span>
                <span class="text-xs font-medium" style="color: {getStrengthColor(passwordStrength)};">
                  {getStrengthText(passwordStrength)}
                </span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2 overflow-hidden" style="background: var(--border-subtle);">
                <div 
                  class="h-2 rounded-full transition-all duration-300" 
                  style="width: {passwordStrength}%; background: {getStrengthColor(passwordStrength)};"
                ></div>
              </div>
            </div>
          {/if}
          
          {#if form?.errors?.password}
            <p class="mt-1 text-sm" style="color: var(--vibrant-red);">{form.errors.password[0]}</p>
          {:else}
            <p class="mt-1 text-xs" style="color: var(--text-muted);">{$t('auth.register.passwordRequirements')}</p>
          {/if}
        </div>

        <!-- Confirm Password -->
        <div>
          <label for="confirmPassword" class="block text-sm font-medium heading" style="color: var(--text-primary);">
            {$t('auth.register.confirmPasswordLabel')}
          </label>
          <div class="mt-1 relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock class="h-5 w-5" style="color: var(--text-muted);" />
            </div>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              autocomplete="new-password"
              required
              class="block w-full pl-10 pr-3 py-3 border-2 rounded-2xl transition-all duration-200 focus:outline-none focus:ring-0"
              style="border-color: var(--border-medium); 
                     background: var(--bg-card); 
                     color: var(--text-primary);
                     backdrop-filter: blur(10px);"
              placeholder={$t('auth.register.confirmPasswordPlaceholder')}
            />
          </div>
          {#if form?.errors?.confirmPassword}
            <p class="mt-1 text-sm" style="color: var(--vibrant-red);">{form.errors.confirmPassword[0]}</p>
          {/if}
        </div>

        <!-- Community ID (Optional) -->
        <div>
          <label for="communityId" class="block text-sm font-medium heading" style="color: var(--text-primary);">
            {$t('auth.register.communityLabel')}
            <span style="color: var(--text-muted);">({$t('auth.register.optional')})</span>
          </label>
          <div class="mt-1 relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MapPin class="h-5 w-5" style="color: var(--text-muted);" />
            </div>
            <input
              id="communityId"
              name="communityId"
              type="text"
              class="block w-full pl-10 pr-3 py-3 border-2 rounded-2xl transition-all duration-200 focus:outline-none focus:ring-0"
              style="border-color: var(--border-medium); 
                     background: var(--bg-card); 
                     color: var(--text-primary);
                     backdrop-filter: blur(10px);"
              placeholder={$t('auth.register.communityPlaceholder')}
              value={form?.data?.communityId || ''}
            />
          </div>
          <p class="mt-1 text-xs" style="color: var(--text-muted);">{$t('auth.register.communityNote')}</p>
        </div>
      </div>

      <!-- Terms Agreement -->
      <div class="flex items-start space-x-3">
        <div class="flex items-center h-5">
          <input
            id="agreeTerms"
            name="agreeTerms"
            type="checkbox"
            required
            class="h-4 w-4 rounded border-2 transition-colors focus:ring-0"
            style="border-color: var(--border-medium); 
                   background: var(--bg-card);
                   color: var(--vibrant-green);"
          />
        </div>
        <div class="text-sm">
          <label for="agreeTerms" style="color: var(--text-secondary);">
            {$t('auth.register.agreementText')}
            <a href="/terms" class="font-medium transition-colors hover:opacity-80" style="color: var(--vibrant-green);">
              {$t('auth.register.termsOfService')}
            </a>
            {$t('auth.register.and')}
            <a href="/privacy" class="font-medium transition-colors hover:opacity-80" style="color: var(--vibrant-green);">
              {$t('auth.register.privacyPolicy')}
            </a>
          </label>
        </div>
      </div>

      <!-- Submit Button -->
      <button type="submit" class="btn-primary w-full flex items-center justify-center py-3 group">
        <span class="flex items-center">
          {$t('auth.register.createAccountButton')}
          <ArrowRight class="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </button>

      <!-- Login Link -->
      <div class="text-center">
        <p class="text-sm" style="color: var(--text-muted);">
          {$t('auth.register.alreadyMember')}
          <a href="/auth/login" 
             class="font-medium transition-colors hover:opacity-80" 
             style="color: var(--vibrant-green);">
            {$t('auth.register.signIn')}
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
            {$t('auth.register.orContinueWith')}
          </span>
        </div>
      </div>

      <!-- Community Invitation -->
      <div class="space-y-3">
        <button type="button" 
                class="btn-secondary w-full flex items-center justify-center py-3"
                disabled>
          <Heart class="h-4 w-4 mr-2 hearts-pulse" />
          {$t('auth.register.communityInvite')}
        </button>
        <p class="text-xs text-center" style="color: var(--text-muted);">
          {$t('auth.register.inviteOnlyNote')}
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
  
  /* Checkbox styling */
  input[type="checkbox"]:checked {
    background-color: var(--vibrant-green) !important;
    border-color: var(--vibrant-green) !important;
  }
  
  input[type="checkbox"]:focus {
    box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.1) !important;
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
  
  /* Password strength indicator animations */
  .password-strength-bar {
    transition: width 0.3s ease, background-color 0.3s ease;
  }
</style>
