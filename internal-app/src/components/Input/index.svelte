<script lang="ts">
    import {StyleType} from "$lib/global/enums/StyleType";
    import {AutoCompleteType} from "$lib/global/enums/AutoCompleteType";

    export let autoComplete: AutoCompleteType = AutoCompleteType.ON;
    export let className = "";
    export let label = "";
    export let name = "";
    export let placeholder = "";
    export let styleType: StyleType = StyleType.PRIMARY;
    export let type = "text";
    export let value = "";

    let inputBind: HTMLInputElement;

    function typeAction(node: HTMLInputElement) {
        node.type = type;
    }

    $: {
        if (type && inputBind) {
            typeAction(inputBind);
        }
    }
</script>

<label class="{styleType} {className}"
       for={name}>
    {#if label}
        <span>{label}</span>
    {/if}
    <input autoComplete={autoComplete}
           bind:this={inputBind}
           bind:value
           id={name}
           name={name}
           on:change
           on:input
           placeholder={placeholder ?? ""}>
</label>

<style lang="scss">
  @import "$scss/_mixin.scss";

  label {
    display: flex;
    flex-direction: column;
  }

  .primary {
    input {
      @include primary-input;
    }
  }
</style>