<script lang="ts">
    import {tenantList} from "./stores/tenantList";
    import {page} from "$app/stores";
    import type {GridColumnDef} from "$components/DataTable/types/GridColumnDef";
    import DataTable from "$components/DataTable/index.svelte";
    import TenantForm from "./components/TenantForm/index.svelte";
    import {currentTenant} from "./stores/currentTenant";

    tenantList.set($page.data.tenantsResponse.data);
    $: $page.data.tenantsResponse, tenantList.set($page.data.tenantsResponse.data);

    let columns: GridColumnDef[] = [
        {
            headerName: "Id",
            field: "id",
            type: "uuid"
        },
        {
            headerName: "Company Name",
            field: "companyName",
            width: 155,
            type: "string",
        },
        {
            headerName: "Email",
            field: "email",
            width: 125,
            type: "string",
        },
        {headerName: "Subdomain", field: "subdomain", type: "string"},
        {headerName: "Phone", field: "phone", type: "string"},
        {headerName: "Created On", field: "createdOn", type: "date"},
        {headerName: "Updated On", field: "updatedOn", type: "date"},
    ];

    let selectedRow: any;
    $: selectedRow, currentTenant.set(selectedRow);
</script>

<div class="container">
    <DataTable bind:selectedRow={selectedRow}
               columns={columns}
               open={!!$currentTenant}
               response={$page.data.tenantsResponse}>
        <TenantForm/>
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
