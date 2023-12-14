<script lang="ts">
    import Snackbar from "$layouts/Snackbar/index.svelte";
    import {onMount} from "svelte";
    import {givenWelcomeMessage} from "$stores/users/givenWelcomeMessage";
    import PageHeader from "$components/PageHeader/index.svelte";

    onMount(async () => {
        givenWelcomeMessage.set(false);
    });
</script>

<PageHeader/>

<slot></slot>
<Snackbar/>