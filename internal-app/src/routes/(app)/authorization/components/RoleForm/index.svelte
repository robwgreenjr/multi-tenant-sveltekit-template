<script lang="ts">
    import Drawer from "$components/Drawer/index.svelte";
    import {currentRole} from "../../stores/currentRole.ts";
    import Input from "$components/Input/index.svelte";
    import Button from "$components/Button/index.svelte";
    import {enhance} from '$app/forms';
    import {showMessage} from "$lib/global/helpers/FormHelper";
    import {snackBar} from "$stores/layouts/snackBar";
    import {MessageSeverity} from "$lib/global/enums/MessageSeverity";
    import PermissionSelection
        from "./components/PermissionSelection/index.svelte";
    import {StyleType} from "$lib/global/enums/StyleType";
</script>

<Drawer onClose={() => currentRole.set(null)}
        open={$currentRole}>
	{#if $currentRole}
		<form method="POST"
		      action="?/{$currentRole.id ? 'updateRole' : 'createRole'}"
		      use:enhance={({formData}) => {
                  if ($currentRole.id) {
                    formData.set("id", $currentRole.id);
                  }

                  formData.set("permissions", JSON.stringify($currentRole.permissions));

	              return ({ result, update }) => {
	                  showMessage(result.data, snackBar, {
	                      message: `Role ${$currentRole.id ? 'updated' : 'created'}!`,
	                      severity: MessageSeverity.SUCCESS,
	                      show: true,
	                      timeout: 2000,
	                  });

	                  update({ reset: false });

                      if (result.data.data.length) {
                          currentRole.set(result.data.data[0]);
                      }
	              };
              }}>
			<Input name="name"
			       value={$currentRole.name ?? null}
			       label="Name"/>

			<Input name="description"
			       value={$currentRole.description ?? null}
			       label="Description"/>

			<PermissionSelection/>

			<Button
				title="Save"
				type="submit"
				styleType={StyleType.PRIMARY_CTA}
			/>
		</form>
	{/if}
</Drawer>