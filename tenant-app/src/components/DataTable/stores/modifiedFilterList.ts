import {writable} from "svelte/store";
import type {Filter} from "$components/DataTable/types/Filter";

export const modifiedFilterList = writable<Filter[]>([]);