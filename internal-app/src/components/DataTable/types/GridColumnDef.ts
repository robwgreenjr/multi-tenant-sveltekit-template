export type GridColumnDef = {
	field: string;
	/**
	 * The title of the column rendered in the column header cell.
	 */
	headerName?: string;
	/**
	 * Set the width of the column.
	 * @default 100
	 */
	width?: number;

	type?: string;
};
