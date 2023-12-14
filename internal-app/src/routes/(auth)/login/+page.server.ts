import type {RequestEvent} from "@sveltejs/kit";
import {redirect} from "@sveltejs/kit";
import {fetchRequest} from "$lib/global/helpers/RequestHelper";
import {HttpMethod} from "$lib/global/enums/HttpMethod";
import type {
    AuthenticationToken
} from "$lib/authentication/types/AuthenticationToken";
import {serverVariable} from "$lib/global/variables/ServerVariable";
import HttpStatusCode from "$lib/global/enums/HttpStatusCode";
import type {Actions} from "$types/(auth)/login/$types";
import type {PageServerLoad} from "$types/(app)/$types";

export const load = (async () => {
    return {
        pageTitle: "Login"
    }
}) satisfies PageServerLoad;

export const actions = {
    login: async ({cookies, request}: RequestEvent) => {
        const data: FormData = await request.formData();
        const email: FormDataEntryValue | null = data.get("email");
        const password: FormDataEntryValue | null = data.get("password");

        const response = await fetchRequest({
            url: `${serverVariable.serverPath}authentication/jwt`,
            method: HttpMethod.POST,
            body: {
                email,
                password
            },
        });

        if (response.data.length) {
            const jwt: AuthenticationToken = response.data[0];
            cookies.set('jwt', jwt.token);

            throw redirect(HttpStatusCode.RedirectFound, "/");
        }

        return response;
    }
} satisfies Actions;