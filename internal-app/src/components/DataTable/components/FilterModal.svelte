<script lang="ts">
    import type {GridColumnDef} from "../types/GridColumnDef";
    import {QueryFilter} from "../enums/QueryFilter";
    import type {Filter} from "../types/Filter";
    import {determineFilterType, getColumn} from "../helpers/FilterHelper";
    import {filterIndex} from "../helpers/QueryHelper";
    import Input from "../../Input/index.svelte";
    import Select from "../../Select/index.svelte";
    import Button from "../../Button/index.svelte";
    import {StyleType} from "$lib/global/enums/StyleType";
    import {
        activeFilterModalIndex
    } from "$components/DataTable/stores/activeFilterModalIndex";
    import {
        modifiedFilterList
    } from "$components/DataTable/stores/modifiedFilterList";
    import {clickOutside} from "$directives/clickOutside";

    export let columns: GridColumnDef[] = [];

    let filter: Filter;
    let filterValueType: string = determineFilterType(filter ? filter.column?.type : columns[0].type);

    const saveFilter = () => {
        $modifiedFilterList[$activeFilterModalIndex] = filter;

        activeFilterModalIndex.set(null);
    }

    const closeFilterModal = () => {
        activeFilterModalIndex.set(null);
    }

    const onColumnChange = (event: any) => {
        filter.column = getColumn(columns, event.target.value ?? "");

        if (filter.column) {
            filterValueType =
                determineFilterType(filter.column.type ?? "") ?? "text";
        }
    }

    const onOperatorChange = (event: any) => {
        filter.operator = event.target.value;
    }

    const setFilter = (currentFilterIndex: number) => {
        filter = $modifiedFilterList[currentFilterIndex];
    }

    $: setFilter($activeFilterModalIndex);
</script>

<div
    class="filter_container"
    on:click_outside={closeFilterModal}
    use:clickOutside={["filter_modal"]}
>
    {#if filter}
        <Select
            label="Column"
            on:change={onColumnChange}
            value={filter.column?.field ? filter.column?.field : columns[0].field}
        >
            {#each columns as column}
                <option value={column.field}>{column.headerName}</option>
            {/each}
        </Select>

        <Select
            bind:value={filter.operator}
            label="Operator"
            on:change={onOperatorChange}
        >
            {#each Object.values(QueryFilter) as filter}
                <option value={filter}>{filterIndex[filter]}</option>
            {/each}
        </Select>

        <Input
            bind:type={filterValueType}
            bind:value={filter.value}
            label="Value"
            styleType={StyleType.BLANK}
        />
    {/if}

    <div class="button_container">
        <Button on:click={saveFilter} title="Done"/>
    </div>

    <div class="pointer"></div>
</div>

<style lang="scss">
    @import "$scss/_mixin.scss";

    .filter_container {
        background-color: $primary-white;
        border: 1px solid $light-grey;
        border-radius: $primary-border-radius;
        display: flex;
        flex-direction: column;
        height: 170px;
        justify-content: space-between;
        left: -27.8rem;
        padding: 1rem;
        position: absolute;
        top: -2.3rem;
        width: 400px;
    }

    .button_container {
        display: flex;
        justify-content: right;
    }

    p {
        display: flex;
        flex-direction: column;
    }

    .pointer {
        background: $primary-white;
        border: 0;
        border-right: 1px solid $light-grey;
        border-top: 1px solid $light-grey;
        height: 1rem;
        left: 26.5rem;
        position: absolute;
        top: 6.3rem;
        transform: rotate(45deg);
        width: 1rem;
    }
</style>