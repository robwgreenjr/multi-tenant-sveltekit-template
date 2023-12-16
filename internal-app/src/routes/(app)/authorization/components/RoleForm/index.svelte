<script lang="ts">
    import Drawer from "$components/Drawer/index.svelte";
    import {currentRole} from "../../stores/currentRole";
    import Input from "$components/Input/index.svelte";
    import Button from "$components/Button/index.svelte";
    import {enhance} from '$app/forms';
    import {showMessage} from "$lib/global/helpers/FormHelper";
    import {snackBar} from "$stores/layouts/snackBar";
    import {MessageSeverity} from "$lib/global/enums/MessageSeverity";
    import PermissionSelection
        from "./components/PermissionSelection/index.svelte";
    import {StyleType} from "$lib/global/enums/StyleType";
    import {ButtonType} from "$lib/global/enums/ButtonType";
    import type {ActionResult} from "@sveltejs/kit";
    import type {ResponseDto} from "$lib/global/dtos/ResponseDto";

    const handleResult = async (result: ActionResult) => {
        if (result.type !== "success") return;
        const data = (result.data as ResponseDto);

        showMessage(data, snackBar, {
            message: `Role ${$currentRole?.id ? 'updated' : 'created'}!`,
            severity: MessageSeverity.SUCCESS,
            show: true,
            timeout: 2000,
        });

        if (data.data.length) {
            currentRole.set(data.data[0]);
        }
    }

    const onDescriptionChange = (event: Event): void => {
        const target = (event.target as HTMLInputElement);
        if (!$currentRole) return;

        currentRole.set({...$currentRole, description: target.value});
    }

    const onNameChange = (event: Event): void => {
        const target = (event.target as HTMLInputElement);
        if (!$currentRole) return;

        currentRole.set({...$currentRole, name: target.value});
    }
</script>

<Drawer onClose={() => currentRole.set(null)}
        open={!!$currentRole}>
    {#if $currentRole}
        <form method="POST"
              action="?/{$currentRole.id ? 'updateRole' : 'createRole'}"
              use:enhance={({formData}) => {
                  if ($currentRole?.id) {
                    formData.set("id", $currentRole.id.toString());
                  }

                  formData.set("permissions", JSON.stringify($currentRole?.permissions));
                  formData.set("users", JSON.stringify($currentRole?.users));

	              return ({ result, update }) => {
                      handleResult(result);

                      update({ reset: false });
	              };
              }}>

            <Input
                label="Name"
                name="name"
                on:change={onNameChange}
                value={$currentRole.name ?? null}
            />

            <Input
                label="Description"
                name="description"
                on:change={onDescriptionChange}
                value={$currentRole.description ?? null}
            />

            <PermissionSelection/>

            <Button
                title="Save"
                type={ButtonType.SUBMIT}
                styleType={StyleType.PRIMARY_CTA}
            />
        </form>
    {/if}
</Drawer>