<script lang="ts">
    import {MessageSeverity} from "$lib/global/enums/MessageSeverity";
    import {snackBar} from "$stores/layouts/snackBar";

    export let timeout = 4000;

    const severityColor = (severity: MessageSeverity): string => {
        return severity.toLowerCase();
    };

    $: {
        if ($snackBar.show) {
            setInterval(() => {
                $snackBar.show = false;

                snackBar.set($snackBar);
            }, $snackBar.timeout ?? timeout);
        }
    }
</script>

<aside class={`container ${$snackBar.show ? "show" : ""}`}>
    <div class={`surface ${severityColor($snackBar.severity)}`}>
        <svg aria-hidden="true"
             class="icon"
             fill="white"
             viewBox="0 0 24 24">
            {#if $snackBar.severity === MessageSeverity.INFO}
                <path d="M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20, 12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10, 10 0 0,0 12,2M11,17H13V11H11V17Z"></path>
            {:else if $snackBar.severity === MessageSeverity.WARNING}
                <path d="M12 5.99L19.53 19H4.47L12 5.99M12 2L1 21h22L12 2zm1 14h-2v2h2v-2zm0-6h-2v4h2v-4z"></path>
            {:else if $snackBar.severity === MessageSeverity.SUCCESS}
                <path d="M20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4C12.76,4 13.5,4.11 14.2, 4.31L15.77,2.74C14.61,2.26 13.34,2 12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0, 0 22,12M7.91,10.08L6.5,11.5L11,16L21,6L19.59,4.58L11,13.17L7.91,10.08Z"></path>
            {:else if $snackBar.severity === MessageSeverity.ERROR}
                <path d="M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path>
            {/if}
        </svg>
        <div class="message">
            {$snackBar.message}
        </div>
    </div>
</aside>

<style lang="scss">
  @import "$scss/variables";

  .container {
    z-index: -100;
    margin: 1rem;
    position: absolute;
    display: flex;
    bottom: 0;
    opacity: 0;
    transition: opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  }

  .show {
    z-index: 100;
    opacity: 1;
    transition: opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  }

  .surface {
    display: flex;
    padding: 0.5rem 1rem;
    color: $primary-white;
    border-radius: 4px;
    box-shadow: $primary-dark-box-shadow;
    transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  }

  .info {
    background-color: $primary-info;
  }

  .error {
    background-color: $primary-error;
  }

  .success {
    background-color: $primary-success;
  }

  .warning {
    background-color: $primary-warning;
  }

  .icon {
    height: 1.5rem;
    width: 1.5rem;
    margin-right: 0.5rem;
  }

  .message {
    margin: auto;
    font-weight: bolder;
  }
</style>
