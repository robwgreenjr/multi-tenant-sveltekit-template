<script lang="ts">
    import {page} from "$app/stores";
    import {camelCaseToNormal} from "$lib/global/utilities/StringParser";
    import {sortList} from "$lib/global/utilities/ArrayHandler";
    import PermissionCheckbox from "../PermissionCheckbox/index.svelte";

    const permissionTypes = Array.from(new Set(
        $page.data.permissionList.map((permission) => {
            return permission.type;
        }))).sort(sortList);
    const permissionNames = Array.from(new Set(
        $page.data.permissionList.map((permission) => {
            return permission.name;
        }))).sort(sortList);
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
					<PermissionCheckbox permission={$page.data.permissionList.filter(
                                                        (p) =>
                                                            p.name === permissionName &&
                                                            p.type === permissionType,
                                                    )[0]}/>
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