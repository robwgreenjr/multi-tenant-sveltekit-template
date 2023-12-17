<script lang="ts">
    import {sideMenu} from "$stores/layouts/sideMenu";
    import UserAccount from "./components/UserAccount.svelte";
    import PageList from "./components/PageList.svelte";

    const toggleSideMenu = () => {
        if ($sideMenu) {
            sideMenu.set(!$sideMenu);
        }
    };
</script>
<div class="container">
    <div class={`side_container ${$sideMenu ? "open" : ""}`}>
        <UserAccount toggleSideMenu={toggleSideMenu}/>
        <PageList/>
    </div>
    <div class="main_container" on:mouseup={toggleSideMenu}>
        <slot></slot>
    </div>
</div>

<style lang="scss">
  @import "$scss/variables";

  .container {
    display: flex;
    min-height: $primary-window-height;
  }

  .main_container {
    background-color: $light-grey;
    padding: 0.5rem 0.5rem 0 0.5rem;
    position: relative;
    top: 3.5rem;
    width: 100%;
  }

  .side_container {
    background-color: $primary-white;
    border-right: $primary-border;
    border-top: $primary-border;
    display: flex;
    flex-direction: column;
    height: 100%;
    left: -25rem;
    max-height: $primary-window-height;
    min-width: 250px;
    position: fixed;
    top: 3.5rem;
    z-index: 1000;
  }

  .open {
    left: 0;
  }
</style>
