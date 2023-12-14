<script lang="ts">
    import {clientVariable} from "$lib/global/variables/ClientVariable";
    import {page} from '$app/stores';
</script>

<svelte:head>
	<title>{clientVariable.siteName} - {$page.data.pageTitle ?? ""}</title>
	{#if $page.data.description}
		<meta content={$page.data.description}
		      name="description"/>
	{/if}
	<link href="/favicon.ico"
	      rel="icon"/>
</svelte:head>