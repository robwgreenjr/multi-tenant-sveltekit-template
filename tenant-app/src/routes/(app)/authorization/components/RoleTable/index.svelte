<script lang="ts">
    import {page} from "$app/stores";
    import {currentRole} from "../../stores/currentRole";
    import Button from "$components/Button/index.svelte";
    import {StyleType} from "$lib/global/enums/StyleType";
    import {ButtonType} from "$lib/global/enums/ButtonType";
    import type {ResponseDto} from "$lib/global/dtos/ResponseDto";
    import {clientVariable} from "$lib/global/variables/ClientVariable";
    import {HttpMethod} from "$lib/global/enums/HttpMethod";
    import {fetchRequest} from "$lib/global/helpers/RequestHelper";
    import {showMessage} from "$lib/global/helpers/FormHelper";
    import {snackBar} from "$stores/layouts/snackBar";
    import {MessageSeverity} from "$lib/global/enums/MessageSeverity";
    import {roleList} from "../../stores/roleList";

    const deleteRole = async (id: string) => {
        const response: ResponseDto = await fetchRequest({
            url: `${clientVariable.clientPath}api/authorization/role/${id}`,
            method: HttpMethod.DELETE,
        });

        showMessage(response, snackBar, {
            message: "Role deleted.",
            severity: MessageSeverity.SUCCESS,
            show: true,
        });

        roleList.set([...$roleList.filter((r) => r.id !== id)]);
    }

    $: $page.data.roleList, roleList.set($page.data.roleList);
</script>
<div class="container">
    <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Users</th>
                <th>Permissions</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            {#each $roleList as role}
                <tr>
                    <td>{role.name}</td>
                    <td>{role.users.length}
                        user{role.users.length === 1 ? "" : "s"}</td>
                    <td>{role.permissions.length}
                        permission{role.permissions.length === 1 ?
                            "" :
                            "s"}</td>
                    <td>
                        <Button
                            on:click={() => currentRole.set(role)}
                            title="Edit"
                        />
                        <Button
                            on:click={() => deleteRole(role.id)}
                            title="Delete"
                            type={ButtonType.SUBMIT}
                            styleType={StyleType.PRIMARY_ERROR}
                        />
                    </td>
                </tr>
            {/each}
        </tbody>
    </table>
</div>

<style lang="scss">
  @import "$scss/_variables.scss";

  .container {
    background: $primary-light;
    border-radius: 4px;
    box-shadow: $primary-box-shadow;
    padding: 1rem;
    max-width: 80%;
    margin: auto;

    table {
      width: 100%;
      margin: auto;

      th {
        text-align: left;
      }
    }
  }
</style>