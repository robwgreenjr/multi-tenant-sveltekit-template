import type {RequestEvent} from "@sveltejs/kit";
import {fetchRequest} from "$lib/global/helpers/RequestHelper";
import {HttpMethod} from "$lib/global/enums/HttpMethod";
import {serverVariable} from "$lib/global/variables/ServerVariable";
import type {Actions} from "$types/(auth)/reset-password/[token]/$types";
import type {PageServerLoad} from "$types/(app)/$types";

export const load = (async () => {
    return {
        pageTitle: "Confirm Email"
    }
}) satisfies PageServerLoad;

export const actions = {
    confirmTenant: async ({request}: RequestEvent) => {
        const data: FormData = await request.formData();

        const firstName: FormDataEntryValue | null = data.get('firstName');
        const lastName: FormDataEntryValue | null = data.get('lastName');
        const email: FormDataEntryValue | null = data.get('email');
        const phone: FormDataEntryValue | null = data.get('phone');
        const token: FormDataEntryValue | null = data.get('token');

        const tenantId = await fetchRequest({
            url: `${serverVariable.serverPath}tenant/registration/confirmation/${token}`,
            method: HttpMethod.GET,
        });

        return await fetchRequest({
            url: `${serverVariable.serverPath}tenant/registration/confirmation`,
            method: HttpMethod.POST,
            headers: {
                "tenant-id": tenantId.data[0].tenantId
            },
            body: {
                email,
                firstName,
                lastName,
                phone,
                token
            },
        });

    }
} satisfies Actions;