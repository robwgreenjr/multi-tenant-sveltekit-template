import type {RequestEvent} from "@sveltejs/kit";
import {fetchRequest} from "$lib/global/helpers/RequestHelper";
import {HttpMethod} from "$lib/global/enums/HttpMethod";
import {serverVariable} from "$lib/global/variables/ServerVariable";
import type {Actions} from "$types/(auth)/login/$types";
import type {PageServerLoad} from "$types/(app)/$types";

export const load = (async () => {
    return {
        pageTitle: "Register"
    }
}) satisfies PageServerLoad;

export const actions = {
    register: async ({cookies, request}: RequestEvent) => {
        const data: FormData = await request.formData();
        const email: FormDataEntryValue | null = data.get("email");
        const companyName: FormDataEntryValue | null = data.get("companyName");
        const subdomain: FormDataEntryValue | null = data.get("subdomain");

        return await fetchRequest({
            url: `${serverVariable.serverPath}tenant/registration`,
            method: HttpMethod.POST,
            body: {
                email,
                companyName,
                subdomain
            },
        });
    }
} satisfies Actions;