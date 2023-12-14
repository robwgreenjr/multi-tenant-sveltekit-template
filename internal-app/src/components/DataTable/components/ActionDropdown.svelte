<script lang="ts">
    import {clickOutside} from "$directives/clickOutside";

    export let openTableControls;
    export let filterOpen: boolean;

    const closeTableControls = () => {
        openTableControls = false;
    }

    const openFilter = () => {
        filterOpen = true;

        closeTableControls();
    }
</script>

<div class="container"
     data-ignore="tableConfig"
     on:click_outside={openTableControls ? closeTableControls : null}
     use:clickOutside={{ignore: 'tableConfig'}}>
	<h3>Table Controls</h3>
	<ul>
		<li>
			<button on:click={() => openFilter()}>Edit Filters</button>
		</li>
	</ul>
</div>

<style lang="scss">
  @import "$scss/_mixin.scss";

  .container {
    z-index: 1000;
    position: absolute;
    background-color: $primary-white;
    width: 11rem;
    left: -8.8rem;
    top: 2.2rem;
    border-radius: 5px;
    box-shadow: $primary-dark-box-shadow;
  }

  h3 {
    font-size: 1rem;
    text-align: center;
    font-weight: normal;
    letter-spacing: 1px;
    margin: 0.5rem 0;
    text-transform: uppercase;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      text-align: left;

      button {
        cursor: pointer;
        padding: 0.4rem 0 0.4rem 0.3rem;
        width: 100%;
        height: 100%;
        background-color: transparent;
        border: none;
        text-align: left;
      }

      &:hover {
        background-color: $light-grey;
      }
    }
  }
</style>