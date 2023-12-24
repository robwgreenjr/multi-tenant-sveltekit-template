import type { MessageSeverity } from "$lib/global/enums/MessageSeverity";

export type Snackbar = {
	severity: MessageSeverity;
	message: string;
	show: boolean;
	timeout?: number;
};
