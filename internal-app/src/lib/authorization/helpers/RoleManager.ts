import {fetchRequest} from "$lib/global/helpers/RequestHelper";
import {HttpMethod} from "$lib/global/enums/HttpMethod";
import {MessageSeverity} from "$lib/global/enums/MessageSeverity";
import type {Role} from "../types/Role";
import type {ResponseDto} from "$lib/global/dtos/ResponseDto";
import type {Writable} from "svelte/store";
import type {Snackbar} from "$lib/global/types/Snackbar";

export const submitRoleUpdate = async (role: Role, snackBar: Writable<Snackbar>) => {
    const response: ResponseDto = await fetchRequest({
        url: `/api/authorization/role/${role.id}`,
        method: HttpMethod.PUT,
        body: role,
    });

    const message = {
        message: "Role updated.",
        severity: MessageSeverity.SUCCESS,
        show: true,
    };

    if (response.errors.length > 0) {
        message.message = response.errors[0].message;
        message.severity = MessageSeverity.ERROR;
    }

    snackBar.set(message);
};

export const submitRoleListUpdate = async (roleList: Role[]): Promise<ResponseDto> => {
    return await fetchRequest({
        url: `/api/authorization/roles`,
        method: HttpMethod.PUT,
        body: roleList,
    });
};

export const submitRoleCreate = async (role: Role, snackBar: Writable<Snackbar>): Promise<Role> => {
    const response: ResponseDto = await fetchRequest({
        url: `/api/authorization/role`,
        method: HttpMethod.POST,
        body: role,
    });

    const message = {
        message: "Role created.",
        severity: MessageSeverity.SUCCESS,
        show: true,
    };

    if (response.errors.length > 0) {
        message.message = response.errors[0].message;
        message.severity = MessageSeverity.ERROR;
    }

    snackBar.set(message);

    return response.data[0];
};

export const submitRoleDelete = async (id: number, snackBar: Writable<Snackbar>) => {
    const response: ResponseDto = await fetchRequest({
        url: `/api/authorization/role/${id}`,
        method: HttpMethod.DELETE,
    });

    const message = {
        message: "Role deleted.",
        severity: MessageSeverity.SUCCESS,
        show: true,
    };

    if (response.errors.length > 0) {
        message.message = response.errors[0].message;
        message.severity = MessageSeverity.ERROR;
    }

    snackBar.set(message);
};
