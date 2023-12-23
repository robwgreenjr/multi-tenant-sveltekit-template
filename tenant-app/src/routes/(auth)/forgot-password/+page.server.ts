import type {RequestEvent} from "@sveltejs/kit";
import {fetchRequest} from "$lib/global/helpers/RequestHelper";
import {HttpMethod} from "$lib/global/enums/HttpMethod";
import {serverVariable} from "$lib/global/variables/ServerVariable";
import type {Actions} from "$types/(auth)/reset-password/[token]/$types";
import type {PageServerLoad} from "$types/(app)/$types";

export const load = (async () => {
    return {
        pageTitle: "Forgot Password"
    }
}) satisfies PageServerLoad;

export const actions = {
    forgotPassword: async ({request, url}: RequestEvent) => {
        const data: FormData = await request.formData();
        const email: FormDataEntryValue | null = data.get('email');

        return await fetchRequest({
            url: `${serverVariable.serverPath}authentication/password/forgot`,
            method: HttpMethod.POST,
            subdomain: url,
            body: {
                email
            },
        });
    }
} satisfies Actions;