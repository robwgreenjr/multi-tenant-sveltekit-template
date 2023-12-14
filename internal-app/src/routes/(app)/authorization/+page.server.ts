import type {PageServerLoad} from "$types/(app)/$types";
import {fetchRequest} from "$lib/global/helpers/RequestHelper";
import {serverVariable} from "$lib/global/variables/ServerVariable";
import {HttpMethod} from "$lib/global/enums/HttpMethod";
import type {RequestEvent} from "@sveltejs/kit";

export const load = (async ({cookies}) => {
    const roles = await fetchRequest({
        url: `${serverVariable.serverPath}authorization/roles`,
        method: HttpMethod.GET,
        headers: {
            Authorization: `Bearer ${cookies.get("jwt")}`,
        },
    });

    const permissions = await fetchRequest({
        url: `${serverVariable.serverPath}authorization/permissions`,
        method: HttpMethod.GET,
        headers: {
            Authorization: `Bearer ${cookies.get("jwt")}`,
        },
    });

    return {
        pageTitle: "Authorization",
        roleList: roles.data,
        permissionList: permissions.data
    }
}) satisfies PageServerLoad;

export const actions = {
    createRole: async ({request, cookies}: RequestEvent) => {
        const data: FormData = await request.formData();
        const name: FormDataEntryValue | null = await data.get("name");
        const description: FormDataEntryValue | null = await data.get(
            "description");
        const permissions: FormDataEntryValue | null = JSON.parse(
            <string>await data.get(
                "permissions"));

        return await fetchRequest({
            url: `${serverVariable.serverPath}authorization/role`,
            headers: {
                Authorization: `Bearer ${cookies.get("jwt")}`,
            },
            method: HttpMethod.POST,
            body: {
                name,
                description,
                permissions
            },
        });
    },
    updateRole: async ({request, cookies}: RequestEvent) => {
        const data: FormData = await request.formData();
        const id: FormDataEntryValue | null = await data.get("id");
        const name: FormDataEntryValue | null = await data.get("name");
        const description: FormDataEntryValue | null = await data.get(
            "description");
        const permissions: FormDataEntryValue | null = JSON.parse(
            <string>await data.get(
                "permissions"));

        return await fetchRequest({
            url: `${serverVariable.serverPath}authorization/role/${id}`,
            headers: {
                Authorization: `Bearer ${cookies.get("jwt")}`,
            },
            method: HttpMethod.PUT,
            body: {
                name,
                description,
                permissions
            },
        });
    }
}
