import type {RequestEvent} from "@sveltejs/kit";
import {json} from "@sveltejs/kit";
import {fetchRequest} from "$lib/global/helpers/RequestHelper";
import {HttpMethod} from "$lib/global/enums/HttpMethod";

export async function POST({request, cookies, url}: RequestEvent) {
    const data = await request.json();

    const response = await fetchRequest({
        url: data.url,
        method: HttpMethod.GET,
        subdomain: url,
        headers: {
            Authorization: `Bearer ${cookies.get("jwt")}`,
        },
    });

    return json(response);
}
