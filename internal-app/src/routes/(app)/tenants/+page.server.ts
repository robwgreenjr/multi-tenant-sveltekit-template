import type {PageServerLoad} from "$types/(app)/$types";
import {fetchRequest} from "$lib/global/helpers/RequestHelper";
import {serverVariable} from "$lib/global/variables/ServerVariable";
import {HttpMethod} from "$lib/global/enums/HttpMethod";
import type {RequestEvent} from "@sveltejs/kit";

export const load = (async ({cookies, url}) => {
    const tenants = await fetchRequest({
        url: `${serverVariable.serverPath}internal/tenants?sort_by=asc(id)&${url.searchParams.toString()}`,
        method: HttpMethod.GET,
        headers: {
            Authorization: `Bearer ${cookies.get("jwt")}`,
        },
    });

    return {
        pageTitle: "Tenants",
        tenantsResponse: tenants,
    }
}) satisfies PageServerLoad;

export const actions = {
    createTenant: async ({request, cookies}: RequestEvent) => {
        const data: FormData = await request.formData();
        const companyName: FormDataEntryValue | null = data.get("companyName");
        const subdomain: FormDataEntryValue | null = data.get("subdomain");
        const email: FormDataEntryValue | null = data.get("email");
        const phone: FormDataEntryValue | null = data.get("phone");

        return await fetchRequest({
            url: `${serverVariable.serverPath}internal/tenant`,
            headers: {
                Authorization: `Bearer ${cookies.get("jwt")}`,
            },
            method: HttpMethod.POST,
            body: {
                companyName,
                subdomain,
                email,
                phone
            },
        });
    },
    updateTenant: async ({request, cookies}: RequestEvent) => {
        const data: FormData = await request.formData();
        const companyName: FormDataEntryValue | null = data.get("companyName");
        const subdomain: FormDataEntryValue | null = data.get("subdomain");
        const email: FormDataEntryValue | null = data.get("email");
        const phone: FormDataEntryValue | null = data.get("phone");

        return await fetchRequest({
            url: `${serverVariable.serverPath}internal/tenant/${data.get("id")}`,
            headers: {
                Authorization: `Bearer ${cookies.get("jwt")}`,
            },
            method: HttpMethod.PUT,
            body: {
                companyName,
                subdomain,
                email,
                phone
            },
        });
    }
}