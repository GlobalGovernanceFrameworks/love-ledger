<!-- src/routes/+layout.svelte -->
<script lang="ts">
  import '../app.css';
  import Layout from '$lib/components/Layout.svelte';
  
  export let data;
</script>

<Layout user={data.user}>
  <slot />
</Layout>
