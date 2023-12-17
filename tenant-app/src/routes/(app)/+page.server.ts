import type {PageServerLoad} from "$types/(app)/$types";

export const load = (async () => {
    return {
        pageTitle: "Dashboard"
    }
}) satisfies PageServerLoad;