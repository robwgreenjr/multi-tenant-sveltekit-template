<script lang="ts">
    import {page} from "$app/stores";
    import {camelCaseToNormal} from "$lib/global/utilities/StringParser";
    import PermissionCheckbox from "../PermissionCheckbox/index.svelte";
    import type {Permission} from "$lib/authorization/types/Permission";
    import {sortList} from "$lib/global/utilities/ArrayHandler";

    const permissionTypes: string[] = (Array.from(new Set(
        $page.data.permissionList.map((permission: Permission): string => {
            return permission.type;
        }))) as string[])
        .sort(sortList);

    const permissionNames: string[] = (Array.from(new Set(
        $page.data.permissionList.map((permission: Permission) => {
            return permission.name.replace("/", " ");
        }))) as string[]).sort(sortList);

    const filterPermission = (permissionName: string, permissionType: string): Permission => {
        return $page.data.permissionList.filter((p: Permission) => {
            return p.name === permissionName.replace(" ", "/") &&
                p.type === permissionType
        })[0];
    }
</script>

<h3>Permissions</h3>

<table>
    <thead>
    <tr>
        <th></th>
        {#each permissionTypes as permissionType}
            <th>{camelCaseToNormal(permissionType)}</th>
        {/each}
    </tr>
    </thead>

    <tbody>
    {#each permissionNames as permissionName}
        <tr>
            <td class="permission_name">
                {camelCaseToNormal(permissionName)}
            </td>

            {#each permissionTypes as permissionType}
                <PermissionCheckbox
                        permission={filterPermission(permissionName, permissionType)}/>
            {/each}
        </tr>
    {/each}
    </tbody>
</table>

<style lang="scss">
  .permission_name {
    text-align: left;
  }
</style>