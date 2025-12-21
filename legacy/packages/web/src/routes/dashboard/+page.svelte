<!-- src/routes/dashboard/+page.svelte -->
<script lang="ts">
  import { Heart, TreePine, Plus, Calendar, TrendingUp, Award, Users, Sparkles } from 'lucide-svelte';
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { t, loadTranslations, detectLocale } from '$lib/i18n';
  import HeartsBadge from '$lib/components/HeartsBadge.svelte';
  import CareActCard from '$lib/components/CareActCard.svelte';
  import ColorShiftingHeart from '$lib/components/ColorShiftingHeart.svelte';
  
  export let data;
  
  const { user, heartsBalance, recentCareActs, stats } = data;
  
  // Load translations on mount
  onMount(async () => {
    const locale = detectLocale();
    await loadTranslations(locale, $page.url.pathname);
  });
  
  // Icon backgrounds for different sections
  const iconBackgrounds = {
    hearts: { color: '#ef4444', secondary: '#dc2626' },
    leaves: { color: '#22c55e', secondary: '#16a34a' },
    monthly: { color: '#3b82f6', secondary: '#2563eb' },
    aubi: { color: '#8b5cf6', secondary: '#7c3aed' },
    community: { color: '#f59e0b', secondary: '#d97706' }
  };
</script>

<svelte:head>
  <title>{$t('dashboard.pageTitle')} - {$t('common.site.title')}</title>
  <meta name="description" content={$t('dashboard.metaDescription')} />
</svelte:head>

<div class="space-y-8">
  <!-- Welcome Header with Theme-Aware Styling -->
  <div class="hero-section rounded-2xl overflow-hidden">
    <div class="px-6 py-8 sm:px-8 relative">
      <!-- Background gradient overlay -->
      <div class="absolute inset-0 opacity-20" 
           style="background: var(--gradient-earth-vibrant);"></div>
      
      <div class="relative z-10 flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <!-- Welcome heart with pulsing animation -->
          <div class="color-shifting-icon p-3 rounded-2xl" 
               style="background: var(--gradient-hearts-rainbow); box-shadow: var(--shadow-medium);">
            <ColorShiftingHeart size="lg" category="community" />
          </div>
          
          <div>
            <h1 class="heading text-2xl md:text-3xl font-bold" style="color: var(--text-primary);">
              {#if user.displayName}
                {$t('dashboard.welcome', { name: user.displayName })}
              {:else}
                {$t('dashboard.welcomeFallback')}
              {/if}
            </h1>
            <p class="mt-2 text-lg" style="color: var(--text-secondary);">
              {$t('dashboard.subtitle')}
            </p>
          </div>
        </div>
        
        <div class="hidden sm:block">
          <a href="/care/log" class="btn-primary flex items-center">
            <Plus class="h-4 w-4 mr-2" />
            {$t('dashboard.logCareAct')}
          </a>
        </div>
      </div>
    </div>
  </div>

  <!-- Stats Grid with Adaptive Styling -->
  <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
    <!-- Total Hearts -->
    <div class="stats-card">
      <div class="flex items-center space-x-4">
        <div class="color-shifting-icon p-3 rounded-xl hearts-pulse" 
             style="background: linear-gradient(135deg, {iconBackgrounds.hearts.color}, {iconBackgrounds.hearts.secondary});">
          <Heart class="h-6 w-6 text-white fill-current" />
        </div>
        <div class="flex-1">
          <dt class="text-sm font-medium" style="color: var(--text-muted);">{$t('dashboard.stats.totalHearts')}</dt>
          <dd class="text-2xl font-bold" style="color: var(--text-primary);">
            {heartsBalance?.totalHearts?.toLocaleString() || 0}
          </dd>
        </div>
      </div>
    </div>

    <!-- Total Leaves -->
    <div class="stats-card">
      <div class="flex items-center space-x-4">
        <div class="color-shifting-icon p-3 rounded-xl leaves-sway" 
             style="background: linear-gradient(135deg, {iconBackgrounds.leaves.color}, {iconBackgrounds.leaves.secondary});">
          <TreePine class="h-6 w-6 text-white" />
        </div>
        <div class="flex-1">
          <dt class="text-sm font-medium" style="color: var(--text-muted);">{$t('dashboard.stats.totalLeaves')}</dt>
          <dd class="text-2xl font-bold" style="color: var(--text-primary);">
            {heartsBalance?.totalLeaves?.toLocaleString() || 0}
          </dd>
        </div>
      </div>
    </div>

    <!-- This Month -->
    <div class="stats-card">
      <div class="flex items-center space-x-4">
        <div class="color-shifting-icon p-3 rounded-xl" 
             style="background: linear-gradient(135deg, {iconBackgrounds.monthly.color}, {iconBackgrounds.monthly.secondary});">
          <Calendar class="h-6 w-6 text-white" />
        </div>
        <div class="flex-1">
          <dt class="text-sm font-medium" style="color: var(--text-muted);">{$t('dashboard.stats.thisMonth')}</dt>
          <dd class="text-2xl font-bold" style="color: var(--text-primary);">
            {heartsBalance?.monthlyHearts?.toLocaleString() || 0}
          </dd>
        </div>
      </div>
    </div>

    <!-- AUBI Bonus -->
    <div class="stats-card">
      <div class="flex items-center space-x-4">
        <div class="color-shifting-icon p-3 rounded-xl" 
             style="background: linear-gradient(135deg, {iconBackgrounds.aubi.color}, {iconBackgrounds.aubi.secondary});">
          <TrendingUp class="h-6 w-6 text-white" />
        </div>
        <div class="flex-1">
          <dt class="text-sm font-medium" style="color: var(--text-muted);">{$t('dashboard.stats.aubiBonus')}</dt>
          <dd class="text-2xl font-bold" style="color: var(--text-primary);">
            ${heartsBalance?.aubiBonus?.toLocaleString() || 0}
          </dd>
        </div>
      </div>
    </div>
  </div>

  <!-- LMCI Progress with Theme Styling -->
  <div class="card">
    <div class="border-b pb-4 mb-6" style="border-color: var(--border-subtle);">
      <div class="flex items-center space-x-3">
        <div class="color-shifting-icon p-2 rounded-lg" 
             style="background: var(--gradient-hearts-rainbow);">
          <Sparkles class="h-5 w-5 text-white" />
        </div>
        <div>
          <h3 class="heading text-lg font-semibold" style="color: var(--text-primary);">
            {$t('dashboard.lmci.title')}
          </h3>
          <p class="text-sm" style="color: var(--text-muted);">
            {$t('dashboard.lmci.subtitle')}
          </p>
        </div>
      </div>
    </div>
    
    <div class="grid grid-cols-1 gap-6 sm:grid-cols-3">
      <!-- Love Score -->
      <div>
        <div class="flex items-center justify-between mb-2">
          <span class="text-sm font-medium" style="color: var(--text-secondary);">{$t('dashboard.lmci.love')}</span>
          <span class="text-sm" style="color: var(--text-muted);">{Math.round((heartsBalance?.loveScore || 0) * 100)}%</span>
        </div>
        <div class="lmci-progress">
          <div class="lmci-progress-fill love-progress" 
               style="width: {Math.min((heartsBalance?.loveScore || 0) * 100, 100)}%"></div>
        </div>
      </div>

      <!-- Meaning Score -->
      <div>
        <div class="flex items-center justify-between mb-2">
          <span class="text-sm font-medium" style="color: var(--text-secondary);">{$t('dashboard.lmci.meaning')}</span>
          <span class="text-sm" style="color: var(--text-muted);">{Math.round((heartsBalance?.meaningScore || 0) * 100)}%</span>
        </div>
        <div class="lmci-progress">
          <div class="lmci-progress-fill meaning-progress" 
               style="width: {Math.min((heartsBalance?.meaningScore || 0) * 100, 100)}%"></div>
        </div>
      </div>

      <!-- Connection Score -->
      <div>
        <div class="flex items-center justify-between mb-2">
          <span class="text-sm font-medium" style="color: var(--text-secondary);">{$t('dashboard.lmci.connection')}</span>
          <span class="text-sm" style="color: var(--text-muted);">{Math.round((heartsBalance?.connectionScore || 0) * 100)}%</span>
        </div>
        <div class="lmci-progress">
          <div class="lmci-progress-fill connection-progress" 
               style="width: {Math.min((heartsBalance?.connectionScore || 0) * 100, 100)}%"></div>
        </div>
      </div>
    </div>
  </div>

  <!-- Recent Care Acts and Quick Actions -->
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
    <!-- Recent Care Acts -->
    <div class="lg:col-span-2">
      <div class="card">
        <div class="border-b pb-4 mb-6" style="border-color: var(--border-subtle);">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <Heart class="h-5 w-5 hearts-pulse" style="color: var(--vibrant-red);" />
              <h3 class="heading text-lg font-semibold" style="color: var(--text-primary);">
                {$t('dashboard.recentCareActs.title')}
              </h3>
            </div>
            <a href="/care/history" class="text-sm transition-colors hover:opacity-80" 
               style="color: var(--vibrant-green);">
              {$t('dashboard.recentCareActs.viewAll')}
            </a>
          </div>
        </div>
        
        {#if recentCareActs && recentCareActs.length > 0}
          <div class="space-y-4">
            {#each recentCareActs as careAct}
              <CareActCard {careAct} />
            {/each}
          </div>
        {:else}
          <div class="text-center py-12">
            <div class="color-shifting-icon mx-auto mb-4 p-4 rounded-2xl" 
                 style="background: linear-gradient(135deg, {iconBackgrounds.hearts.color}, {iconBackgrounds.hearts.secondary});">
              <Heart class="h-8 w-8 text-white fill-current hearts-pulse" />
            </div>
            <h3 class="heading text-lg font-medium mb-2" style="color: var(--text-primary);">
              {$t('dashboard.recentCareActs.empty.title')}
            </h3>
            <p class="text-sm mb-6" style="color: var(--text-muted);">
              {$t('dashboard.recentCareActs.empty.description')}
            </p>
            <a href="/care/log" class="btn-primary inline-flex items-center">
              <Plus class="h-4 w-4 mr-2" />
              {$t('dashboard.logCareAct')}
            </a>
          </div>
        {/if}
      </div>
    </div>

    <!-- Quick Actions & Community -->
    <div class="space-y-6">
      <!-- Quick Actions -->
      <div class="card">
        <div class="border-b pb-4 mb-6" style="border-color: var(--border-subtle);">
          <div class="flex items-center space-x-3">
            <Plus class="h-5 w-5" style="color: var(--vibrant-green);" />
            <h3 class="heading text-lg font-semibold" style="color: var(--text-primary);">
              {$t('dashboard.quickActions.title')}
            </h3>
          </div>
        </div>
        
        <div class="space-y-3">
          <a href="/care/log" class="btn-primary w-full flex items-center justify-center">
            <Plus class="h-4 w-4 mr-2" />
            {$t('dashboard.logCareAct')}
          </a>
          
          {#if user.role === 'community_weaver'}
            <a href="/validate" class="btn-secondary w-full flex items-center justify-center">
              <Award class="h-4 w-4 mr-2" />
              {$t('dashboard.quickActions.validate')}
            </a>
          {/if}
          
          <a href="/community" class="btn-secondary w-full flex items-center justify-center">
            <Users class="h-4 w-4 mr-2" />
            {$t('dashboard.quickActions.community')}
          </a>
        </div>
      </div>

      <!-- Community Stats -->
      <div class="card">
        <div class="border-b pb-4 mb-6" style="border-color: var(--border-subtle);">
          <div class="flex items-center space-x-3">
            <div class="color-shifting-icon p-2 rounded-lg" 
                 style="background: linear-gradient(135deg, {iconBackgrounds.community.color}, {iconBackgrounds.community.secondary});">
              <Users class="h-4 w-4 text-white" />
            </div>
            <h3 class="heading text-lg font-semibold" style="color: var(--text-primary);">
              {$t('dashboard.communityImpact.title')}
            </h3>
          </div>
        </div>
        
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <span class="text-sm" style="color: var(--text-secondary);">{$t('dashboard.communityImpact.heartsCirculation')}</span>
            <HeartsBadge hearts={12847} size="sm" type="community" />
          </div>
          <div class="flex items-center justify-between">
            <span class="text-sm" style="color: var(--text-secondary);">{$t('dashboard.communityImpact.careHours')}</span>
            <span class="text-sm font-medium" style="color: var(--text-primary);">1,256</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-sm" style="color: var(--text-secondary);">{$t('dashboard.communityImpact.activeMembers')}</span>
            <span class="text-sm font-medium" style="color: var(--text-primary);">89</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-sm" style="color: var(--text-secondary);">{$t('dashboard.communityImpact.leavesEarned')}</span>
            <HeartsBadge hearts={0} leaves={234} size="sm" type="ecology" />
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
