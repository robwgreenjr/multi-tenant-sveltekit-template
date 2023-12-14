<script lang="ts">
    import {clickOutside} from "$directives/clickOutside.ts";

    export let open = false;
    export let onClose = () => {};

    const handleClickOutside = () => {
        if (open) {
            open = !open;
        }
    };

    const handleClose = (open) => {
        if (!open) {
            onClose();
        }
    }

    $: handleClose(open);
</script>

<div class="container {open ? 'open': '' }"
     on:click_outside={handleClickOutside}
     use:clickOutside>
	<slot></slot>
</div>
<div aria-hidden="true"
     class="backdrop {open ? 'open': '' }"></div>

<style lang="scss">
  @import "$scss/_variables.scss";

  .container {
    background-color: $primary-white;
    display: none;
    transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    box-shadow: $primary-dark-box-shadow;
    overflow-y: auto;
    flex-direction: column;
    height: 100%;
    flex: 1 0 auto;
    z-index: 8000;
    position: fixed;
    top: 0;
    outline: 0;
    right: 0;
    padding: 1rem;
  }

  .backdrop {
    position: fixed;
    display: none;
    align-items: center;
    justify-content: center;
    inset: 0;
    background-color: $primary-black;
    opacity: 0.3;
    -webkit-tap-highlight-color: transparent;
    z-index: 1100;
  }

  .open {
    display: flex;
  }
</style>
