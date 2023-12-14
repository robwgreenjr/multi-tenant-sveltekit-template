<script lang="ts">
    import {page} from '$app/stores';

    export let toggleSideMenu: () => void;
</script>
<div>
    <div class="user__container">
        <h3>{$page.data.user.firstName}</h3>
        <a href="/user-account"
           on:click={toggleSideMenu}>
            <div class="account"><span>View Account</span></div>
        </a>
    </div>
</div>

<style lang="scss">
  @import "$scss/variables";
  @import "$scss/mixin";

  .user__container {
    text-align: center;
    margin: 1rem;

    a {
      text-decoration: none;
      color: $primary-black;
      text-transform: capitalize;
      font-size: 1.5rem;
    }
  }

  .account {
    color: $primary-dark;
    opacity: 0.7;
    font-size: 0.8rem;

    span {
      @include primary-hover-effect;
    }
  }

  h3 {
    margin: 0;
  }
</style>
