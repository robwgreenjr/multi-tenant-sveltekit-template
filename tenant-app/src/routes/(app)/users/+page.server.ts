import type {PageServerLoad} from "$types/(app)/$types";
import {fetchRequest} from "$lib/global/helpers/RequestHelper";
import {serverVariable} from "$lib/global/variables/ServerVariable";
import {HttpMethod} from "$lib/global/enums/HttpMethod";
import type {RequestEvent} from "@sveltejs/kit";
import type {ResponseDto} from "$lib/global/dtos/ResponseDto";

export const load = (async ({cookies, url}) => {
    const users = await fetchRequest({
        url: `${serverVariable.serverPath}users?sort_by=asc(id)&${url.searchParams.toString()}`,
        method: HttpMethod.GET,
        subdomain: url,
        headers: {
            Authorization: `Bearer ${cookies.get("jwt")}`,
        },
    });

    const roles = await fetchRequest({
        url: `${serverVariable.serverPath}authorization/roles`,
        method: HttpMethod.GET,
        subdomain: url,
        headers: {
            Authorization: `Bearer ${cookies.get("jwt")}`,
        },
    });

    return {
        pageTitle: "Users",
        usersResponse: users,
        roleList: roles.data
    }
}) satisfies PageServerLoad;

export const actions = {
    createUser: async ({
                           request,
                           cookies,
                           url
                       }: RequestEvent): Promise<ResponseDto> => {
        const data: FormData = await request.formData();
        const firstName: FormDataEntryValue | null = data.get("firstName");
        const lastName: FormDataEntryValue | null = data.get("lastName");
        const email: FormDataEntryValue | null = data.get("email");
        const phone: FormDataEntryValue | null = data.get("phone");

        return await fetchRequest({
            url: `${serverVariable.serverPath}user`,
            headers: {
                Authorization: `Bearer ${cookies.get("jwt")}`,
            },
            subdomain: url,
            method: HttpMethod.POST,
            body: {
                firstName,
                lastName,
                email,
                phone
            },
        });
    },

    updateUser: async ({
                           request,
                           cookies,
                           url
                       }: RequestEvent): Promise<ResponseDto> => {
        const data: FormData = await request.formData();
        const firstName: FormDataEntryValue | null = data.get("firstName");
        const lastName: FormDataEntryValue | null = data.get("lastName");
        const email: FormDataEntryValue | null = data.get("email");
        const phone: FormDataEntryValue | null = data.get("phone");

        return await fetchRequest({
            url: `${serverVariable.serverPath}user/${data.get("id")}`,
            headers: {
                Authorization: `Bearer ${cookies.get("jwt")}`,
            },
            method: HttpMethod.PUT,
            subdomain: url,
            body: {
                firstName,
                lastName,
                email,
                phone
            },
        });
    }
}

