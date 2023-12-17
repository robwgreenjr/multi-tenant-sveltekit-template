import type {Writable} from "svelte/store";
import {writable} from "svelte/store";
import type {Role} from "$lib/authorization/types/Role";

export const roleList: Writable<Role[]> = writable<Role[]>([]);