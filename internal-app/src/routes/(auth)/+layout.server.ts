import type {ServerLoadEvent} from "@sveltejs/kit";
import type {LayoutServerLoad} from "$types/(auth)/$types";

export const load = (async ({cookies}: ServerLoadEvent) => {
    cookies.delete('jwt');
}) satisfies LayoutServerLoad;