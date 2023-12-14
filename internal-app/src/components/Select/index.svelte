<script lang="ts">
    import {StyleType} from "$lib/global/enums/StyleType";

    export let className = "";
    export let label = "";
    export let onChange: () => void;
    export let styleType: StyleType = StyleType.PRIMARY;
    export let value;
</script>

<label style="{styleType} {className}">
    {#if label}
        <span>{label}</span>
    {/if}
    <select bind:value={value}
            on:change={onChange}>
        <slot></slot>
    </select>
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