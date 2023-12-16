<script>
    import {sideMenu} from "$stores/layouts/sideMenu";

    const toggleSideMenu = () => {
        sideMenu.set(!$sideMenu);
    }
</script>

<div class="burger__container {$sideMenu ? 'active' : ''}"
     on:mouseup={toggleSideMenu}>
    <div class="burger">
        <div class="bar"></div>
    </div>
</div>

<style lang="scss">
  @import "$scss/variables";

  .burger__container {
    display: block;
    position: relative;
    width: 3em;
  }

  .burger {
    background: none;
    border: none;
    display: block;
    width: 100%;
    height: 2.7em;
    cursor: pointer;
  }

  .bar {
    position: absolute;
    background: $primary-dark;
    width: 1.5em;
    height: 3px;
    top: 50%;
    transition: all 175ms cubic-bezier(0.4, 0.25, 0.3, 1);

    &:before, &:after {
      content: "";
      position: absolute;
      background: $primary-dark;
      width: 1.5em;
      height: 3px;
      right: 0;
      transform: rotate(0);
    }

    &:before {
      top: -0.5rem;
      transition: top 175ms 175ms cubic-bezier(0.4, 0.25, 0.3, 1), transform 175ms cubic-bezier(0.4, 0.25, 0.3, 1);
    }

    &:after {
      bottom: -0.5rem;
      transition: bottom 175ms 175ms cubic-bezier(0.4, 0.25, 0.3, 1), transform 175ms cubic-bezier(0.4, 0.25, 0.3, 1);
    }
  }

  .active {
    .bar {
      transition: background 50ms linear;
      transition-delay: 175ms;
      background: transparent;

      &:before {
        transition: top 175ms cubic-bezier(0.4, 0.25, 0.3, 1), transform 175ms 175ms cubic-bezier(0.4, 0.25, 0.3, 1);
        top: 0;
        transform: rotate(45deg);
      }

      &:after {
        transition: bottom 175ms cubic-bezier(0.4, 0.25, 0.3, 1), transform 175ms 175ms cubic-bezier(0.4, 0.25, 0.3, 1);
        bottom: 0;
        transform: rotate(-45deg);
      }
    }
  }
</style>