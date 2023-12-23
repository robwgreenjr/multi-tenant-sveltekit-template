import {HttpMethod} from "$lib/global/enums/HttpMethod";
import {fetchRequest} from "$lib/global/helpers/RequestHelper";
import {serverVariable} from "$lib/global/variables/ServerVariable";
import type {RequestEvent} from "@sveltejs/kit";
import {json} from "@sveltejs/kit";

export async function DELETE({params, cookies, url}: RequestEvent) {
    const response = await fetchRequest({
        url: `${serverVariable.serverPath}authorization/role/${params.id}`,
        method: HttpMethod.DELETE,
        subdomain: url,
        headers: {
            Authorization: `Bearer ${cookies.get("jwt")}`,
        },
    });

    return json(response);
}
