import type {RequestEvent} from "@sveltejs/kit";
import {fetchRequest} from "$lib/global/helpers/RequestHelper";
import {HttpMethod} from "$lib/global/enums/HttpMethod";
import {serverVariable} from "$lib/global/variables/ServerVariable";
import type {Actions} from "$types/(auth)/reset-password/[token]/$types";
import type {PageServerLoad} from "$types/(app)/$types";

export const load = (async () => {
    return {
        pageTitle: "Reset Password"
    }
}) satisfies PageServerLoad;

export const actions = {
    resetPassword: async ({request}: RequestEvent) => {
        const data: FormData = await request.formData();
        const password: FormDataEntryValue | null = data.get('password');
        const passwordConfirmation: FormDataEntryValue | null = data.get('passwordConfirmation');
        const token: FormDataEntryValue | null = data.get('token');

        return await fetchRequest({
            url: `${serverVariable.serverPath}authentication/password/reset`,
            method: HttpMethod.POST,
            body: {
                password,
                passwordConfirmation,
                token
            },
        });
    }
} satisfies Actions;