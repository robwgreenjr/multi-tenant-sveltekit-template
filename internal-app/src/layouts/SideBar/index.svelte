<script lang="ts">
    import {sideMenu} from "$stores/layouts/sideMenu.ts";
    import UserAccount from "./components/UserAccount.svelte";
    import PageList from "./components/PageList.svelte";

    const toggleSideMenu = () => {
        if ($sideMenu) {
            sideMenu.set(!$sideMenu);
        }
    };
</script>
<div class="view_container">
    <div class={`side_container ${$sideMenu ? "open" : ""}`}>
        <UserAccount toggleSideMenu={toggleSideMenu}/>
        <PageList/>
    </div>
    <div class="main_container"
         on:mouseup={toggleSideMenu}>
        <slot></slot>
    </div>
</div>

<style lang="scss">
  @import "$scss/variables";

  .view_container {
    display: flex;
    min-height: $primary-window-height;
  }

  .main_container {
    position: relative;
    top: 3.5rem;
    padding: 0.5rem 0.5rem 0 0.5rem;
    width: 100%;
    background-color: $light-grey;
  }

  .side_container {
    position: fixed;
    z-index: 1000;
    height: 100%;
    background-color: $primary-white;
    top: 3.5rem;
    left: -25rem;
    min-width: 250px;
    max-height: $primary-window-height;
    border-top: $primary-border;
    border-right: $primary-border;
    display: flex;
    flex-direction: column;
  }

  .open {
    left: 0;
  }
</style>
