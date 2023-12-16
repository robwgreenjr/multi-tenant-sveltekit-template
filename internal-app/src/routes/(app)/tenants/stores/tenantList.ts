import type {Writable} from "svelte/store";
import {writable} from "svelte/store";
import type {User} from "$lib/users/types/User";

export const tenantList: Writable<User[]> = writable<User[]>([]);