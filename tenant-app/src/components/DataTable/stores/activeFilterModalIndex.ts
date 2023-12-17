import {writable} from "svelte/store";

export const activeFilterModalIndex = writable<number | null>(null);