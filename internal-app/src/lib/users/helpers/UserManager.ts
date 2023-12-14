import { fetchRequest } from "$lib/global/helpers/RequestHelper";
import { clientVariable } from "$lib/global/variables/ClientVariable";
import { HttpMethod } from "$lib/global/enums/HttpMethod";
import { MessageSeverity } from "$lib/global/enums/MessageSeverity";
import type { User } from "$lib/users/types/User";
import type { Writable } from "svelte/store";
import type { Snackbar } from "$lib/global/types/Snackbar";
import type { ResponseDto } from "$lib/global/dtos/ResponseDto";

export const submitUserUpdate = async (user: User): Promise<ResponseDto> => {
	return await fetchRequest({
		url: `${clientVariable.clientPath}/api/user/${user.id}`,
		method: HttpMethod.PUT,
		body: user,
	});
};

export const submitUserCreate = async (user: User): Promise<ResponseDto> => {
	return await fetchRequest({
		url: `${clientVariable.clientPath}/api/user`,
		method: HttpMethod.POST,
		body: user,
	});
};

export const submitUserDelete = async (id: number, snackBar: Writable<Snackbar>) => {
	const response: ResponseDto = await fetchRequest({
		url: `${clientVariable.clientPath}/api/user/${id}`,
		method: HttpMethod.DELETE,
	});

	const message = {
		message: "User deleted.",
		severity: MessageSeverity.SUCCESS,
		show: true,
	};

	if (response.errors.length > 0) {
		message.message = response.errors[0].message;
		message.severity = MessageSeverity.ERROR;
	}

	snackBar.set(message);
};
