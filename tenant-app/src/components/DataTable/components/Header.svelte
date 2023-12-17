<script lang="ts">
    import type { GridColumnDef } from "../types/GridColumnDef";
    import {searchTable, sortColumnStatus} from "../helpers/TableHelper";
    import type {ResponseDto} from "$lib/global/dtos/ResponseDto";

    export let response: ResponseDto;
    export let columns : GridColumnDef[];
    export let search: string;
    export let sortStatus = "";

    let hoverStatus = "";

    const sortColumn = async (column: GridColumnDef) => {
        sortStatus = sortColumnStatus(column, sortStatus);

        const result = await searchTable(columns, search, sortStatus, response.links.self.href);
        if (result) {
            response = result;
        }
    };

    const enter = (column: GridColumnDef) => {
        hoverStatus = column.field;
    }

    const leave = () => {
        hoverStatus = "";
    }
</script>

<thead class="container">
    <tr class="row">
        {#each columns as column}
            <th
                class="column"
                on:click={() => sortColumn(column)}
                on:mouseenter={() => enter(column)}
                on:mouseleave={leave}
                style="width: {column.width}px"
            >
                <span class="column_name">{column.headerName}</span>
                <span class="sort">
                    {#if sortStatus.includes(column.field) && sortStatus.includes("asc")}
                        <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24">
                            <path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z"></path>
                        </svg>
                    {:else if sortStatus.includes(column.field) && sortStatus.includes("desc")}
                        <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24">
                            <path d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z"></path>
                        </svg>
                    {:else}
                        <svg
                            aria-hidden="true"
                            class={!sortStatus.includes(column.field) && hoverStatus.includes(column.field) ? "" : "hide"}
                            focusable="false"
                            viewBox="0 0 24 24"
                        >
                            <path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z"></path>
                        </svg>
                    {/if}
                </span>
            </th>
        {/each}
    </tr>
</thead>

<style lang="scss">
    @import "$scss/_mixin.scss";

    .container {
        background-color: $light-grey;
        color: $secondary-grey;
        padding: 0;
        position: sticky;
        top: 0;
        z-index: 1;
    }

    .column {
        cursor: pointer;
        padding: 0.4rem;
        text-align: left;
        user-select: none;
    }

    .column_name {
        color: $primary-grey;
    }

    svg {
        height: 0.8rem;
        opacity: 0.5;
        width: 1rem;
    }

    .hide {
        opacity: 0;
    }
</style>
