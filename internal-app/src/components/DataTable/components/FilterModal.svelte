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

    export let columns: GridColumnDef[] = [];
    export let isModelOpen: boolean;
    export let filter: Filter;

    let filterOperator: QueryFilter = filter?.operator ??
        Object.values(QueryFilter)[0] as QueryFilter;
    let filterColumn: GridColumnDef | null = filter?.column ?? columns[0];
    let filterValue: any = filter?.value ?? "";
    let filterValueType: string = determineFilterType(filterColumn.type ?? "");

    const saveFilter = () => {
        filter.column = filterColumn;
        filter.value = filterValue;
        filter.operator = filterOperator;

        isModelOpen = false;
    }

    const closeFilterModal = (event: Event) => {
        const target = (event.target as HTMLElement);
        if (!target.className.includes("filter") && !target.className.includes("filter_container")) return;

        isModelOpen = false;
    }

    const onColumnChange = (event: any) => {
        filterColumn = getColumn(columns, event.target.value ?? "");

        if (filterColumn) {
            filterValueType =
                determineFilterType(filterColumn.type ?? "") ?? "text";
        }
    }

    const onOperatorChange = (event: any) => {
        filterOperator = event.target.value;
    }
</script>

<div
    class="filter_container"
    on:click={closeFilterModal}
>
    <Select
        label="Column"
        on:change={onColumnChange}
        value={filterColumn?.field ?? ""}
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
        bind:value={filterValue}
        label="Value"
        styleType={StyleType.BLANK}
    />

    <div class="button__container">
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
    top: -5rem;
    width: 400px;
  }

  .button__container {
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