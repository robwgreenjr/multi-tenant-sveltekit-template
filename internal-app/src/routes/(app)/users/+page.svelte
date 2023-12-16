<script lang="ts">
    import {userList} from "./stores/userList";
    import {page} from "$app/stores";
    import type {
        GridColumnDef
    } from "$components/DataTable/types/GridColumnDef";
    import DataTable from "$components/DataTable/index.svelte";
    import {currentUser} from "./stores/currentUser";
    import UserForm from "./components/UserForm/index.svelte";

    userList.set($page.data.usersResponse.data);
    $: $page.data.usersResponse, userList.set($page.data.usersResponse.data);

    let columns: GridColumnDef[] = [
        {
            headerName: "Id",
            field: "id",
            type: "number"
        },
        {
            headerName: "First Name",
            field: "firstName",
            width: 125,
            type: "string",
        },
        {
            headerName: "Last Name",
            field: "lastName",
            width: 125,
            type: "string",
        },
        {
            headerName: "Email",
            field: "email",
            width: 225,
            type: "string"
        },
        {
            headerName: "Phone",
            field: "phone",
            type: "string"
        },
        {
            headerName: "Created On",
            field: "createdOn",
            type: "date"
        },
        {
            headerName: "Updated On",
            field: "updatedOn",
            type: "date"
        },
    ];

    let selectedRow: any;
    $: selectedRow, currentUser.set(selectedRow);
</script>

<div class="container">
    <DataTable bind:selectedRow={selectedRow}
               columns={columns}
               open={!!$currentUser}
               response={$page.data.usersResponse}>
        <UserForm/>
    </DataTable>
</div>

<style lang="scss">
  .container {
    height: 100%;
    display: flex;
    flex-direction: column;
    max-height: calc(100vh - 66px);
  }
</style>
