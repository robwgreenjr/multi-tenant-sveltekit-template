import type {Writable} from "svelte/store";
import {writable} from "svelte/store";
import type {User} from "$lib/users/types/User";

export const currentUser: Writable<User | null> = writable<User | null>(null);