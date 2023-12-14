<script lang="ts">
    import type {ResponseDto} from "$lib/global/dtos/ResponseDto";
    import type {GridColumnDef} from "../types/GridColumnDef";
    import {getNestedProperty} from "$components/DataTable/helpers/TableHelper";

    export let response: ResponseDto;
    export let open: boolean;
    export let selectedRow: any;
    export let columns : GridColumnDef[];

    const viewRow = (row: any) => {
        open = !open;
        selectedRow = {...row};
    }

    const fieldPlacement = (field: string, row: any): string => {
        if (row[field] && !field.includes(".")) {
            return row[field];
        }

        if (!row[field] || !field.includes(".")) {
            return "";
        }

        return getNestedProperty(row, field);
    }
</script>

<tbody class="container">
    {#each [...response.data] as row, ri}
        <tr class="row" data-row-index={ri} on:click={() => viewRow(row)}>
            {#each columns as column, ci}
                <td style="width: {column.width}px;" class="column" data-column-index={ci}>{fieldPlacement(column.field, row)}</td>
            {/each}
        </tr>
    {/each}
</tbody>

<style lang="scss">
  @import "$scss/_mixin.scss";

  .container {
    background-color: $primary-white;
  }

  .row {
      cursor: pointer;
      border-top: 1px solid rgba(38, 89, 43, 0.2);

      &:hover {
        background-color: $light-grey;
      }
  }

  .column {
      white-space: nowrap;
      text-overflow: ellipsis;
      padding: 5px;
  }
</style>