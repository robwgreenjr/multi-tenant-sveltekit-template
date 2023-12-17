import {writable} from "svelte/store";
import type {Filter} from "$components/DataTable/types/Filter";

export const filterList = writable<Filter[]>([]);