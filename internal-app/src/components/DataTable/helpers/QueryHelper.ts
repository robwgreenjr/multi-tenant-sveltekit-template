import { QueryFilter } from "../enums/QueryFilter";

export const filterIndex = {
	[QueryFilter.GT]: "Greater Than",
	[QueryFilter.GTE]: "Greater or Equal",
	[QueryFilter.LT]: "Less Than",
	[QueryFilter.LTE]: "Less Than Equal",
	[QueryFilter.EQ]: "Equals",
	[QueryFilter.NE]: "Not Equal To",
	[QueryFilter.LIKE]: "Contains",
};
