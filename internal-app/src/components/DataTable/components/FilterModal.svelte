<script lang="ts">
	import {clickOutside} from "$directives/clickOutside";
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

        closeFilterModal();
    }

    const closeFilterModal = () => {
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

<div class="container"
     on:click_outside={closeFilterModal}
     use:clickOutside={{ignore: 'filter'}}>

    <Select changeEvent={onColumnChange}
            label="Column"
            value={filterColumn.field}>
        {#each columns as column}
            <option value={column.field}>{column.headerName}</option>
        {/each}
    </Select>

    <Select bind:value={filter.operator}
            changeEvent={onOperatorChange}
            label="Operator">
        {#each Object.values(QueryFilter) as filter}
            <option value={filter}>{filterIndex[filter]}</option>
        {/each}
    </Select>

    <Input bind:type={filterValueType}
           bind:value={filterValue}
           label="Value"
           styleType={StyleType.BLANK}/>

    <div class="button__container">
        <Button onClick={saveFilter}
                title="Done"/>
    </div>

    <div class="pointer"></div>
</div>

<style lang="scss">
  @import "$scss/_mixin.scss";

  .container {
    position: absolute;
    left: -27.8rem;
    top: -5rem;
    background-color: $primary-white;
    padding: 1rem;
    width: 400px;
    height: 170px;
    border: 1px solid $light-grey;
    border-radius: $primary-border-radius;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
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
    position: absolute;
    left: 26.5rem;
    top: 6.3rem;
    border: 0;
    border-right: 1px solid $light-grey;
    border-top: 1px solid $light-grey;
    width: 1rem;
    height: 1rem;
    transform: rotate(45deg);
  }
</style>