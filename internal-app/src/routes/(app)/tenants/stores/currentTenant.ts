import type {Writable} from "svelte/store";
import {writable} from "svelte/store";
import type {Tenant} from "$lib/tenants/types/Tenant";

export const currentTenant: Writable<Tenant | null> = writable<Tenant | null>(null);