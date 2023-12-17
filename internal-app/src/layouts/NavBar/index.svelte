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
    background: $primary-white;
    box-shadow: $primary-dark-box-shadow;
    display: flex;
    height: 3.5rem;
    position: fixed;
    width: 100%;
    z-index: 1000;

    h1 {
      font-size: 1rem;
      padding-left: 0.3rem;
    }

    .right {
      display: flex;
      flex-direction: row-reverse;
      flex-grow: 2;
      margin: 0 1rem;
    }

    .right, .left {
      align-items: center;
      display: flex;
      height: 100%;
    }

    .left {
      margin-left: 1rem;
    }
  }

  .icon {
    font-weight: 700;
    margin-left: 1rem;

    a {
      color: $primary-black;
      text-decoration: none;
    }
  }

  .action_button {
    background-color: $primary-dark;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    position: relative;
  }

  .action_icon {
    color: $primary-light;
    height: 2.2rem;
    position: relative;
    top: 2px;
    width: 1.8rem;
  }
</style>
