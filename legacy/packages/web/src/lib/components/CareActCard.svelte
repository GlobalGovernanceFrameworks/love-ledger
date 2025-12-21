<!-- src/lib/components/CareActCard.svelte -->
<script lang="ts">
  import { Heart, TreePine, Clock, MapPin, CheckCircle, AlertCircle, XCircle } from 'lucide-svelte';
  import HeartsBadge from './HeartsBadge.svelte';
  
  export let careAct: {
    id: string;
    title: string;
    actType: string;
    hours: number;
    impactScore: number;
    heartsEarned?: number;
    leavesEarned?: number;
    validationStatus: string;
    createdAt: Date;
    location?: any;
  };
  
  const statusConfig = {
    pending: { icon: Clock, color: 'bg-yellow-100 text-yellow-800', label: 'Awaiting Witness' },
    validated: { icon: CheckCircle, color: 'bg-green-100 text-green-800', label: 'Witnessed' },
    rejected: { icon: XCircle, color: 'bg-red-100 text-red-800', label: 'Needs Reflection' },
    community_review: { icon: AlertCircle, color: 'bg-blue-100 text-blue-800', label: 'Circle Review' }
  };
  
  const actTypeLabels = {
    elders: 'Elder Care',
    childcare: 'Child Care', 
    ecological: 'Earth Care',
    cultural: 'Cultural Weaving',
    community: 'Community Care'
  };
  
  $: status = statusConfig[careAct.validationStatus as keyof typeof statusConfig];
  $: actTypeLabel = actTypeLabels[careAct.actType as keyof typeof actTypeLabels] || careAct.actType;
</script>

<div class="care-act-card group">
  <!-- Header -->
  <div class="flex items-start justify-between mb-4">
    <div class="flex-1">
      <h3 class="heading text-lg font-medium mb-2 group-hover:text-white transition-colors">{careAct.title}</h3>
      <div class="flex items-center space-x-4 text-sm opacity-75 group-hover:text-white">
        <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
              style="background: var(--hearts-lighter); color: var(--hearts-primary);">
          {actTypeLabel}
        </span>
        <span class="flex items-center">
          <Clock class="h-3 w-3 mr-1" />
          {careAct.hours}h
        </span>
        {#if careAct.location}
          <span class="flex items-center">
            <MapPin class="h-3 w-3 mr-1" />
            Community
          </span>
        {/if}
      </div>
    </div>
    
    <!-- Status Badge -->
    <div class="flex items-center space-x-1 {status.color} px-2 py-1 rounded-full text-xs font-medium">
      <svelte:component this={status.icon} class="h-3 w-3" />
      <span>{status.label}</span>
    </div>
  </div>
  
  <!-- Hearts/Leaves Earned -->
  {#if careAct.validationStatus === 'validated' && (careAct.heartsEarned || careAct.leavesEarned)}
    <div class="flex items-center justify-between mb-4">
      <span class="text-sm opacity-75 group-hover:text-white">Abundance Received:</span>
      <HeartsBadge 
        hearts={careAct.heartsEarned || 0} 
        leaves={careAct.leavesEarned || 0} 
        size="sm" 
      />
    </div>
  {/if}
  
  <!-- Impact Score with Hearts -->
  <div class="flex items-center justify-between text-sm mb-3">
    <span class="opacity-75 group-hover:text-white">Impact Ripples:</span>
    <div class="flex items-center space-x-1">
      {#each Array(5) as _, i}
        <Heart 
          class="h-3 w-3 transition-colors {i < careAct.impactScore ? 'text-red-400 fill-current' : 'opacity-30'}" 
        />
      {/each}
      <span class="ml-1 opacity-75 group-hover:text-white">({careAct.impactScore}/5)</span>
    </div>
  </div>
  
  <!-- Date -->
  <div class="pt-3 border-t border-gray-100 group-hover:border-white/20">
    <span class="text-xs opacity-60 group-hover:text-white">
      {new Date(careAct.createdAt).toLocaleDateString()}
    </span>
  </div>
</div>
