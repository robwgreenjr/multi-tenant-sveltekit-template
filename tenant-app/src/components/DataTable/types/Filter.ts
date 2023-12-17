import type { QueryFilter } from "../enums/QueryFilter";
import type { GridColumnDef } from "./GridColumnDef";

export type Filter = {
	column: GridColumnDef | null;
	operator: QueryFilter;
	value: any;
};
