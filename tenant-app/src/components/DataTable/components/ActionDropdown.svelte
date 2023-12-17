<script lang="ts">
    import {clickOutside} from "$directives/clickOutside";

    export let openTableControls: boolean;
    export let filterOpen: boolean;

    const closeTableControls = (event: Event) => {
        const target = (event.target as HTMLElement);
        if (!target.className.includes("tableConfig") && !target.className.includes("action_dropdown_container")) return;

        openTableControls = false;
    }

    const openFilter = () => {
        filterOpen = true;

        openTableControls = false;
    }
</script>

<div
    class="action_dropdown_container"
    data-ignore="tableConfig"
    on:click_outside={openTableControls ? closeTableControls : () => {}}
    use:clickOutside
>
    <h3>Table Controls</h3>
    <ul>
        <li>
            <button on:click={() => openFilter()}>Edit Filters</button>
        </li>
    </ul>
</div>

<style lang="scss">
  @import "$scss/_mixin.scss";

  .action_dropdown_container {
    background-color: $primary-white;
    border-radius: 5px;
    box-shadow: $primary-dark-box-shadow;
    left: -8.8rem;
    position: absolute;
    top: 2.2rem;
    width: 11rem;
    z-index: 1000;
  }

  h3 {
    font-size: 1rem;
    font-weight: normal;
    letter-spacing: 1px;
    margin: 0.5rem 0;
    text-align: center;
    text-transform: uppercase;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      text-align: left;

      button {
        background-color: transparent;
        border: none;
        cursor: pointer;
        padding: 0.4rem 0 0.4rem 0.3rem;
        width: 100%;
        height: 100%;
        text-align: left;
      }

      &:hover {
        background-color: $light-grey;
      }
    }
  }
</style>