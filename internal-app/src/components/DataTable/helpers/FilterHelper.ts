import type {GridColumnDef} from "../types/GridColumnDef";

export const determineFilterType = (type: string): string => {
    let determinedType = "text";

    if (type === "number") {
        determinedType = type;
    }

    if (type === "string") {
        determinedType = "text";
    }

    return determinedType;
};

export const getColumn = (columns: GridColumnDef[], field: string): GridColumnDef | null => {
    for (const column of columns) {
        if (column.field !== field) continue;

        return column;
    }

    return null;
};
