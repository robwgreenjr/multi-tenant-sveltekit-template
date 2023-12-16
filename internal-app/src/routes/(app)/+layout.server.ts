import type {ServerLoadEvent} from "@sveltejs/kit";
import {redirect} from "@sveltejs/kit";
import HttpStatusCode from "$lib/global/enums/HttpStatusCode";
import type {LayoutServerLoad} from "./$types";
import type {JwtToken} from "$lib/authentication/types/JwtToken";
import {fetchRequest} from "$lib/global/helpers/RequestHelper";
import {serverVariable} from "$lib/global/variables/ServerVariable";
import {HttpMethod} from "$lib/global/enums/HttpMethod";
import type {ResponseDto} from "$lib/global/dtos/ResponseDto";
import {jwtDecode} from "jwt-decode";

export const load = (async ({cookies}: ServerLoadEvent) => {
    if (!cookies.get("jwt")) {
        throw redirect(HttpStatusCode.RedirectFound, "/login");
    }

    const jwt: JwtToken = jwtDecode(<string>cookies.get("jwt"));
    const expirationDate = new Date(jwt.exp * 1000);
    if (new Date() > expirationDate) {
        throw redirect(HttpStatusCode.RedirectFound, "/login");
    }

    const user: ResponseDto = await fetchRequest({
        url: `${serverVariable.serverPath}internal/user/${jwt.userDetails.id}`,
        method: HttpMethod.GET,
    });

    return {
        jwt: jwt,
        user: user.data[0]
    }
}) satisfies LayoutServerLoad;
