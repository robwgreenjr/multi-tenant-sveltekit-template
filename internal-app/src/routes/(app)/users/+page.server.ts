import type {PageServerLoad} from "$types/(app)/$types";
import {fetchRequest} from "$lib/global/helpers/RequestHelper";
import {serverVariable} from "$lib/global/variables/ServerVariable";
import {HttpMethod} from "$lib/global/enums/HttpMethod";

export const load = (async ({cookies}) => {
    const users = await fetchRequest({
        url: `${serverVariable.serverPath}internal/users?sort_by=asc(id)`,
        method: HttpMethod.GET,
        headers: {
            Authorization: `Bearer ${cookies.get("jwt")}`,
        },
    });

    const roles = await fetchRequest({
        url: `${serverVariable.serverPath}internal/authorization/roles`,
        method: HttpMethod.GET,
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
