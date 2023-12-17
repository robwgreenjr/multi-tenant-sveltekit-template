<script lang="ts">

    export let open = false;
    export let onClose = () => {
    };

    const handleClickOutside = (event: Event) => {
        const target = (event.target as HTMLElement);
        if (!target.className.includes("backdrop")) return;

        if (open) {
            open = !open;
        }
    };

    const handleClose = (open: boolean) => {
        if (!open) {
            onClose();
        }
    }

    $: handleClose(open);
</script>

<div
    class="container {open ? 'open': '' }"
    on:click={handleClickOutside}
>
    <slot></slot>
</div>
<div aria-hidden="true" class="backdrop {open ? 'open': '' }"></div>

<style lang="scss">
  @import "$scss/_variables.scss";

  .container {
    background-color: $primary-white;
    box-shadow: $primary-dark-box-shadow;
    display: none;
    flex: 1 0 auto;
    flex-direction: column;
    height: 100%;
    outline: 0;
    overflow-y: auto;
    padding: 1rem;
    position: fixed;
    right: 0;
    top: 0;
    transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    z-index: 8000;
  }

  .backdrop {
    align-items: center;
    background-color: $primary-black;
    display: none;
    inset: 0;
    justify-content: center;
    opacity: 0.3;
    position: fixed;
    z-index: 1100;
    -webkit-tap-highlight-color: transparent;
  }

  .open {
    display: flex;
  }
</style>
