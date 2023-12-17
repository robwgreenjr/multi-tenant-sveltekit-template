<script lang="ts">
    export let cssClass: string;
</script>

<div style={cssClass}>
    <a href="/login">
        <svg
            fill="none"
            height="24"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21"
                  x2="9"
                  y1="12"
                  y2="12"></line>
        </svg>
        Logout
    </a>
</div>

<style lang="scss">
  @import "$scss/mixin";

  a {
    @include primary-anchor;
  }

  svg {
    height: 18px;
    position: relative;
    top: -1.5px;
    vertical-align: middle;
    width: 18px;
  }
</style>