<script lang="ts">
    import {StyleType} from "$lib/global/enums/StyleType";
    import {ButtonType} from "$lib/global/enums/ButtonType";

    export let className = "";
    export let onClick = () => {};
    export let styleType: StyleType = StyleType.PRIMARY;
    export let title = "";
    export let type: ButtonType = ButtonType.BUTTON;

    let buttonBind: HTMLButtonElement;

    function typeAction(node) {
        node.type = type;
    }

    $: {
        if (type && buttonBind) {
            typeAction(buttonBind);
        }
    }
</script>

<button bind:this={buttonBind}
        class="{styleType} {className}"
        on:click={onClick}>
	{#if title}
		{title}
	{/if}
	<slot></slot>
</button>

<style lang="scss">
  @import "$scss/_mixin.scss";

  .primary {
    @include primary-button;
  }

  .primary_cta {
    @include primary-cta-button;
  }

  .primary_error {
    @include primary-error-button;
  }
</style>
