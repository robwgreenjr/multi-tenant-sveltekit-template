<script lang="ts">
    import Drawer from "$components/Drawer/index.svelte";
    import {currentTenant} from "../../stores/currentTenant";
    import {showMessage} from "$lib/global/helpers/FormHelper";
    import {snackBar} from "$stores/layouts/snackBar";
    import {MessageSeverity} from "$lib/global/enums/MessageSeverity";
    import {StyleType} from "$lib/global/enums/StyleType";
    import {enhance} from '$app/forms';
    import Input from "$components/Input/index.svelte";
    import Button from "$components/Button/index.svelte";
    import {ButtonType} from "$lib/global/enums/ButtonType";
    import type {ResponseDto} from "$lib/global/dtos/ResponseDto";

    const handleResult = async (result: ActionResult) => {
        if (result.type !== "success") return;
        const data = (result.data as ResponseDto);

        showMessage(data, snackBar, {
            message: `Tenant ${$currentTenant?.id ? 'updated' : 'created'}!`,
            severity: MessageSeverity.SUCCESS,
            show: true,
            timeout: 2000,
        });

        if (data.data.length) {
            currentTenant.set({
                ...data.data[0],
                id: $currentTenant.id
            });
        }
    }
</script>

<Drawer onClose={() => currentTenant.set(null)} open={!!$currentTenant}>
    {#if $currentTenant}
        <form
            action="?/{$currentTenant.id ? 'updateTenant' : 'createTenant'}"
            method="POST"
            use:enhance={({formData}) => {
                  if ($currentTenant?.id) {
                    formData.set("id", $currentTenant.id);
                  }

	              return ({ result, update }) => {
                      handleResult(result);

                      update({ reset: false });
	              };
            }}
        >
            <Input
                label="Company Name"
                name="companyName"
                value={$currentTenant.companyName ?? null}
            />

            <Input
                label="Subdomain"
                name="subdomain"
                value={$currentTenant.subdomain ?? null}
            />

            <Input
                label="Email"
                name="email"
                value={$currentTenant.email ?? null}
            />

            <Input
                label="Phone"
                name="phone"
                value={$currentTenant.phone ?? null}
            />

            <div class="button_container">
                <Button
                    styleType={StyleType.PRIMARY_CTA}
                    title="Save"
                    type={ButtonType.SUBMIT}
                />

                {#if $currentTenant.id}
                    <Button
                        styleType={StyleType.PRIMARY_ERROR}
                        title="Delete"
                        className="global__user_error_button"
                    />
                {/if}
            </div>

        </form>
    {/if}
</Drawer>

<style lang="scss">
    .button_container {
        display: flex;
        justify-content: space-between;
    }

    :global(.global__user_error_button) {
        width: 6rem;
    }
</style>