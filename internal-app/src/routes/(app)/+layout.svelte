<script lang="ts">
    import {onMount} from "svelte";
    import {givenWelcomeMessage} from "$stores/users/givenWelcomeMessage";
    import {MessageSeverity} from "$lib/global/enums/MessageSeverity";
    import {snackBar} from "$stores/layouts/snackBar";
    import Snackbar from "$layouts/Snackbar/index.svelte";
    import NavBar from "$layouts/NavBar/index.svelte";
    import SideBar from "$layouts/SideBar/index.svelte";
    import PageHeader from "$components/PageHeader/index.svelte";

    onMount(async () => {
        if (!$givenWelcomeMessage) {
            snackBar.set({
                message: "Login Successful!",
                severity: MessageSeverity.SUCCESS,
                show: true,
            });

            givenWelcomeMessage.set(true);
        }
    });
</script>

<PageHeader/>

<NavBar/>
<SideBar>
	<slot></slot>
	<Snackbar/>
</SideBar>

<style lang="scss">
  :global(body) {
    margin: 0;
    font-family: manrope, Helvetica, Arial, sans-serif;
    box-sizing: border-box;
  }
</style>