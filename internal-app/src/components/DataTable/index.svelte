<script lang="ts">
    import type {GridColumnDef} from "./types/GridColumnDef";
    import Drawer from "../Drawer/index.svelte";
    import Header from "./components/Header.svelte";
    import type {ResponseDto} from "$lib/global/dtos/ResponseDto";
    import Actions from "./components/Actions.svelte";
    import Body from "./components/Body.svelte";
    import FilterDrawer from "./components/FilterDrawer.svelte";
    import {fetchRequest} from "$lib/global/helpers/RequestHelper";
    import {HttpMethod} from "$lib/global/enums/HttpMethod";

    export let response: ResponseDto;
    export let selectedRow: any;
    export let open = false;
    export let columns: GridColumnDef[];

    let search = "";
    let sortStatus = "?sort_by=asc(id)";
    let filterOpen = false;
    let lastHrefCalled = "";
    let threshold = 1000;

    const scrollEvent = async (event: Event) => {
        const target = (event.target as HTMLDivElement);
        const offset = target.scrollHeight - target.clientHeight - target.scrollTop;

        if (offset >= threshold) return;
        if (!response.links.next || (lastHrefCalled && lastHrefCalled === response.links.next.href)) {
            return;
        }
        lastHrefCalled = response.links.next.href;

        const newData = await fetchRequest({
            url: `/api/query`,
            method: HttpMethod.POST,
            body: {
                url: response.links.next.href,
            },
        });

        response = {
            ...response, data: [...response.data, ...newData.data],
            links: newData.links
        };
    }
    const closeForm = (open: boolean) => {
        if (!open) {
            selectedRow = null;
        }
    }

    $: closeForm(open);
</script>

<div class="container">
    <Actions
        bind:filterOpen={filterOpen}
        bind:open={open}
        bind:response={response}
        bind:search={search}
        bind:selectedRow={selectedRow}
        bind:sortStatus={sortStatus}
        {columns}
    />
    {#if filterOpen}
        <FilterDrawer
            bind:filterOpen={filterOpen}
            bind:response={response}
            bind:search={search}
            bind:sortStatus={sortStatus}
            {columns}
        />
    {/if}
    <div class="table__container"
         on:scroll={scrollEvent}>
        <table>
            <Header
                bind:response={response}
                bind:search={search}
                bind:sortStatus={sortStatus}
                {columns}
            />

            <Body
                bind:columns={columns}
                bind:open={open}
                bind:response={response}
                bind:selectedRow={selectedRow}
            />
        </table>
    </div>

    <Drawer bind:open={open}>
        <slot></slot>
    </Drawer>
</div>

<style lang="scss">
    @import "$scss/_mixin.scss";

    .container {
        display: flex;
        flex-direction: column;
        height: 100%;
        border: $primary-border;
        border-radius: $primary-border-radius;
    }

    .table__container {
        position: relative;
        overflow: scroll;
        height: 100%;
    }

    table {
        width: 100%;
        border-collapse: collapse;
    }
</style>
