import {writable} from "svelte/store";
import {MessageSeverity} from "$lib/global/enums/MessageSeverity";
import type {Snackbar} from "$lib/global/types/Snackbar";

export const snackBar = writable<Snackbar>({
    message: "",
    severity: MessageSeverity.INFO,
    show: false,
});
