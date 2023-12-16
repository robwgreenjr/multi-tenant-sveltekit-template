<script lang="ts">
	import type {Permission} from "$lib/authorization/types/Permission";
	import {currentRole} from "../../../../stores/currentRole";
	import {page} from "$app/stores";

	export let permission: Permission;

    const isChecked = (): boolean => {
        if (!permission || !$currentRole?.permissions) return false;

        return !!$currentRole?.permissions.filter(
            perm => perm.id === permission.id).length;
    }

    const isDisabled = (): boolean => {
        if (!permission) return true;

        return (
            $page.data.permissionList.filter(
                (p: Permission) => p.id === permission.id).length === 0
        );
    };

    const updateRolePermission = (event: Event) => {
        if (!$currentRole) return;
        const target = event.target as HTMLInputElement;

        if (target.checked) {
            currentRole.set({
                ...$currentRole,
                permissions: [...$currentRole?.permissions, permission]
            });

            return;
        }

        currentRole.set({
            ...$currentRole,
            permissions: [...$currentRole?.permissions.filter(
                (perm: Permission) => perm.id !== permission.id,
            )]
        });
    };
</script>

<td class="container">
    <input
            checked={isChecked()}
            disabled={isDisabled()}
            on:change={updateRolePermission}
            type="checkbox"
            value={`${isChecked()}`}
    />
</td>

<style lang="scss">
  @import "$scss/_variables";

  .container {
    text-align: center;

    input {
      accent-color: $primary-dark;
    }
  }
</style>