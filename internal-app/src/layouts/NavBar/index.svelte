<script lang="ts">
    import Burger from "./components/Burger.svelte";
    import {clientVariable} from "$lib/global/variables/ClientVariable";
    import {page} from '$app/stores';
</script>

<nav>
    <div class="left">
        <Burger/>
        <div class="icon">
            <a href="/">{clientVariable.siteName}</a>
        </div>
        <h1>- {$page.data.pageTitle}</h1>
    </div>
    <div class="right"></div>
</nav>

<style lang="scss">
  @import "$scss/mixin";

  nav {
    position: fixed;
    z-index: 1000;
    width: 100%;
    display: flex;
    height: 3.5rem;
    background: $primary-white;
    box-shadow: $primary-dark-box-shadow;

    h1 {
      font-size: 1rem;
      padding-left: 0.3rem;
    }

    .right {
      flex-grow: 2;
      margin: 0 1rem;
      display: flex;
      flex-direction: row-reverse;
    }

    .right, .left {
      display: flex;
      align-items: center;
      height: 100%;
    }

    .left {
      margin-left: 1rem;
    }
  }

  .icon {
    margin-left: 1rem;
    font-weight: 700;

    a {
      text-decoration: none;
      color: $primary-black;
    }
  }

  .action_button {
    border: none;
    background-color: $primary-dark;
    border-radius: 50%;
    position: relative;
    cursor: pointer;
  }

  .action_icon {
    width: 1.8rem;
    height: 2.2rem;
    color: $primary-light;
    position: relative;
    top: 2px;
  }
</style>
