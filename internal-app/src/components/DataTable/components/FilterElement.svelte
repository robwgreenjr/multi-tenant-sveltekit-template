<script lang="ts">
    import type {Filter} from "../types/Filter";
    import type {GridColumnDef} from "../types/GridColumnDef";
    import FilterModal from "./FilterModal.svelte";
    import {filterIndex} from "../helpers/QueryHelper";

    export let activeIndex: number;
    export let columns: GridColumnDef[];
    export let filter: Filter;
    export let index: number;
    export let updateIndex: (index: number) => void;

    let isModelOpen = false;

    const openFilterModal = (event: Event) => {
        const target = (event.target as HTMLElement);
        if (target.dataset.ignore && target.dataset.ignore === "filter-element-close") {
            return;
        }

        updateIndex(index);
    }

    $: isModelOpen = activeIndex === index
</script>

<div class="container {filter.value ? 'filled_filter' : ''}">
    <div class="content" on:click={openFilterModal}>
        <div class="header">
            <h5>{filter.value && filter?.column?.headerName ? filter.column.headerName : "New Filter*"}</h5>
            <button data-ignore="filter-element-close" on:click>
                <svg
                    aria-hidden="true"
                    data-ignore="filter-element-close"
                    focusable="false"
                    viewBox="0 0 52 52"
                >
                    <path
                        d="M31 25.4l13-13.1c.6-.6.6-1.5 0-2.1l-2-2.1c-.6-.6-1.5-.6-2.1 0L26.8 21.2c-.4.4-1 .4-1.4 0L12.3 8c-.6-.6-1.5-.6-2.1 0l-2.1 2.1c-.6.6-.6 1.5 0 2.1l13.1 13.1c.4.4.4 1 0 1.4L8 39.9c-.6.6-.6 1.5 0 2.1l2.1 2.1c.6.6 1.5.6 2.1 0L25.3 31c.4-.4 1-.4 1.4 0l13.1 13.1c.6.6 1.5.6 2.1 0L44 42c.6-.6.6-1.5 0-2.1L31 26.8c-.4-.4-.4-1 0-1.4z"
                        data-ignore="filter-element-close"
                    ></path>
                </svg>
            </button>
        </div>
        {#if filter.value}
            <div class="body">
                <span>{filter.operator ? filterIndex[filter.operator] : ""}</span>
                <span class="value">{filter.value ? filter.value : ""}</span>
            </div>
        {/if}
    </div>


    {#if isModelOpen}
        <FilterModal
            bind:filter={filter}
            bind:isModelOpen={isModelOpen}
            {columns}
        />
    {/if}
</div>

<style lang="scss">
    @import "$scss/_mixin.scss";

    .container {
        background-color: $light-orange;
        border-radius: $primary-border-radius;
        height: 4rem;
        margin: 0.5rem;
        position: relative;
    }

    .filled_filter {
        background-color: $light-grey;
        border: $primary-border;
    }

    .column {
        text-overflow: ellipsis;
    }

    .content {
        height: 100%;

        &:hover {
            background-color: $light-grey;
            border-radius: $primary-border-radius;
            cursor: pointer;
        }
    }

    .header {
        display: flex;
        justify-content: space-between;

        button {
            background: transparent;
            border: none;
            cursor: pointer;
            height: 1.2rem;
            margin: 0.5rem;
            width: 10%;
        }

        svg {
            height: 1rem;
            width: 1rem;
        }

        h5 {
            font-weight: 100;
            margin: 0;
            padding-top: 0.5rem;
            padding-left: 1rem;
            width: 95%;
        }
    }

    .body {
        font-size: 0.8rem;
        padding-left: 1rem;
    }

    .value {
        margin-left: 0.5rem;
    }
</style>