import {fetchRequest} from "$lib/global/helpers/RequestHelper";
import {HttpMethod} from "$lib/global/enums/HttpMethod";
import type {ResponseDto} from "$lib/global/dtos/ResponseDto";
import type {GridColumnDef} from "../types/GridColumnDef";
import type {Filter} from "$components/DataTable/types/Filter";
import {QueryFilter} from "$components/DataTable/enums/QueryFilter";

export const getNestedProperty = (row: any, field: string): any => {
    const nested = field.split(".");
    if (nested.length === 1) {
        return row[nested[0]];
    }

    const currentField = nested.shift();
    if (!currentField) return;

    return getNestedProperty(row[currentField], nested.join("."));
}

const paramBuilder = (filterList?: Filter[], params?: string): string => {
    if (!filterList || !filterList.length) return "";

    if (!params) {
        params = "";
    }

    for (const filter of filterList) {
        if (!filter.column) continue;

        let operator = "";
        if (filter.operator !== QueryFilter.EQ) {
            operator = `[${filter.operator}]`;
        }

        if (filter.column?.type === "date") {
            try {
                const date = new Date(filter.value);

                params += `&${
                    filter.column?.field
                }${operator}=${date.toISOString()}`;
            } catch (exception: any) {
                // nothing
            }

            continue;
        }

        params += `&${filter.column?.field}${operator}=${filter.value}`;
    }

    return params;
}

export const parseValueType = (value: any): string => {
    if (new RegExp("^[0-9]*$").test(value)) {
        return "number";
    } else if (!isNaN(Date.parse(value))) {
        return "date";
    }

    return "string";
};

export const searchTable = async (
    columns: GridColumnDef[],
    search: string,
    sortStatus: string,
    url: string,
    filterList?: Filter[],
): Promise<ResponseDto | null> => {
    let params = paramBuilder(filterList);

    if (search.length) {
        let index = 0;
        for (const column of columns) {
            const parsedValueType = parseValueType(search);

            const condition = index === 0 ? "&" : "[or]";

            if (
                parsedValueType === "number" &&
                column.type === parsedValueType
            ) {
                params += `${condition}${column.field}=${search}`;
                ++index;
            } else if (
                parsedValueType === "date" &&
                column.type === parsedValueType
            ) {
                const date = new Date(search);

                params += `${condition}${
                    column.field
                }[gte]=${date.toISOString()}`;

                date.setDate(date.getDate() + 1);

                params += `[and]${column.field}[lte]=${date.toISOString()}`;
                ++index;
            } else if (column.type === "string") {
                params += `${condition}${column.field}[like]=${search}`;

                ++index;
            }
        }
    }

    return await fetchRequest({
        url: `/api/query`,
        method: HttpMethod.POST,
        body: {
            url: `${url.split("?")[0]}${
                sortStatus ? sortStatus : "?sort_by=asc(id)"
            }${params}`,
        },
    });
};

export const sortColumnStatus = (
    column: GridColumnDef,
    sortStatus: string,
): string => {
    if (!sortStatus || !sortStatus.includes(column.field)) {
        sortStatus = `?sort_by=asc(${column.field})`;
    } else if (sortStatus && sortStatus.includes("asc")) {
        sortStatus = `?sort_by=desc(${column.field})`;
    } else {
        sortStatus = "?sort_by=asc(id)";
    }

    return sortStatus;
};
