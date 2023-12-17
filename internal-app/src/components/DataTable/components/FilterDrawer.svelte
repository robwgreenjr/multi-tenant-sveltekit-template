<script lang="ts">
    import FilterElement from "./FilterElement.svelte";
    import {QueryFilter} from "../enums/QueryFilter";
    import type {GridColumnDef} from "../types/GridColumnDef";
    import type {ResponseDto} from "$lib/global/dtos/ResponseDto";
    import {searchTable} from "$components/DataTable/helpers/TableHelper";
    import {filterList} from "$components/DataTable/stores/filterList";

    export let activeIndex: number;
    export let columns: GridColumnDef[];
    export let filterOpen;
    export let modifiedFilterList = [...$filterList];
    export let response: ResponseDto;
    export let search = "";
    export let sortStatus = "";

    const close = () => {
        filterOpen = false;
    }

    const save = async () => {
        const result = await searchTable(columns, search, sortStatus,
            response.links.self.href, modifiedFilterList);

        if (result) {
            response = result;
        }

        filterList.set(modifiedFilterList.filter(filter => filter.column));
    }

    const addFilter = () => {
        modifiedFilterList = [
            ...modifiedFilterList,
            {
                column: null,
                operator: QueryFilter.EQ,
                value: null
            }
        ];
    }

    const removeFilter = async (index: number) => {
        modifiedFilterList = modifiedFilterList.filter((v, i) => i !== index);
    }

    const removeAll = async () => {
        modifiedFilterList = [];
    }

    const updateIndex = (index: number) => {
        activeIndex = index;
    }
</script>

<div class="container">
    <div class="header">
        {#if !response.links.self.href.includes("&") && !modifiedFilterList.length && !$filterList.length}
            <h4>Filters</h4>
            <button class="svg_close" on:click={() => close()}>
                <svg aria-hidden="true" focusable="false" viewBox="0 0 52 52">
                    <path
                        d="M31 25.4l13-13.1c.6-.6.6-1.5 0-2.1l-2-2.1c-.6-.6-1.5-.6-2.1 0L26.8 21.2c-.4.4-1 .4-1.4 0L12.3 8c-.6-.6-1.5-.6-2.1 0l-2.1 2.1c-.6.6-.6 1.5 0 2.1l13.1 13.1c.4.4.4 1 0 1.4L8 39.9c-.6.6-.6 1.5 0 2.1l2.1 2.1c.6.6 1.5.6 2.1 0L25.3 31c.4-.4 1-.4 1.4 0l13.1 13.1c.6.6 1.5.6 2.1 0L44 42c.6-.6.6-1.5 0-2.1L31 26.8c-.4-.4-.4-1 0-1.4z"></path>
                </svg>
            </button>
        {:else}
            <button class="cancel_button" on:click={() => close()}>
                Cancel
            </button>
            <button class="save_button" on:click={() => save()}>
                Save
            </button>
        {/if}
    </div>

    <div>
        {#if modifiedFilterList.length > 0}
            <div class="title">
                Matching all of these filters
            </div>
        {/if}

        <div>
            {#each modifiedFilterList as filter, i}
                <FilterElement
                    activeIndex={activeIndex}
                    index={i}
                    on:click={() => removeFilter(i)}
                    updateIndex={() => updateIndex(i)}
                    {columns}
                    {filter}
                />
            {/each}
        </div>
        <div class="links">
            <button on:click={() => addFilter()}>Add Filter</button>
            <button on:click={() => removeAll()}>Remove All</button>
        </div>
    </div>
</div>

<style lang="scss">
    @import "$scss/_mixin.scss";

    .container {
        background-color: $primary-white;
        box-shadow: $primary-dark-box-shadow;
        height: 94%;
        position: absolute;
        right: 0.5rem;
        top: 3.4rem;
        z-index: 10;
    }

    .title {
        font-size: 0.8rem;
        margin: 0.5rem;
    }

    .header {
        border-bottom: 1px solid $light-grey;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 1rem;
        width: 20rem;

        .svg_close {
            background: transparent;
            border: none;
            cursor: pointer;
            height: 1.2rem;
            width: 1.2rem;
        }

        svg {
            height: 1rem;
            width: 1rem;
        }

        h4 {
            margin: 0;
            padding-left: 1rem;
        }
    }

    .links {
        display: flex;
        justify-content: space-between;
        padding: 0.5rem;

        button {
            background: transparent;
            border: none;
            color: $medium-blue;
            cursor: pointer;

            &:hover {
                text-decoration: underline;
            }
        }
    }

    .save_button {
        @include primary-button;
    }

    .cancel_button {
        color: $primary-black;
        cursor: pointer;
    }
</style>