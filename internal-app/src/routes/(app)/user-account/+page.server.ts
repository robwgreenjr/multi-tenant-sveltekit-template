import type {PageServerLoad} from "$types/(app)/$types";
import type {RequestEvent} from "@sveltejs/kit";
import type {Actions} from "$types/(app)/user-account/$types";
import {fetchRequest} from "$lib/global/helpers/RequestHelper";
import {serverVariable} from "$lib/global/variables/ServerVariable";
import {HttpMethod} from "$lib/global/enums/HttpMethod";

export const load = (async () => {
    return {
        pageTitle: "User Account"
    }
}) satisfies PageServerLoad;

export const actions = {
    submitUserAccountForm: async ({request}: RequestEvent) => {
        const data: FormData = await request.formData();
        const id: FormDataEntryValue | null = await data.get("id");
        const firstName: FormDataEntryValue | null = data.get("firstName");
        const lastName: FormDataEntryValue | null = data.get("lastName");
        const email: FormDataEntryValue | null = data.get("email");
        const phone: FormDataEntryValue | null = data.get("phone");

        let response = await fetchRequest({
            url: `${serverVariable.serverPath}user/${id}`,
            method: HttpMethod.PATCH,
            body: {
                firstName,
                lastName,
                email,
                phone
            },
        });

        if (response.errors.length) {
            return response;
        }

        const confirmCurrentPassword: FormDataEntryValue | null = data.get(
            "confirmCurrentPassword");
        const newPassword: FormDataEntryValue | null = data.get("newPassword");
        const confirmNewPassword: FormDataEntryValue | null = data.get(
            "confirmNewPassword");

        if (confirmCurrentPassword && (!newPassword || !confirmNewPassword)) {
            response.data = [];
            response.errors.push({
                error: "Bad Request",
                message: "When creating a new password you must provide a new password along with a confirmation.",
                status: 400
            });

            return response;
        }

        if ((newPassword && confirmNewPassword) && newPassword !==
            confirmNewPassword) {
            response.data = [];
            response.errors.push({
                error: "Bad Request",
                message: "Your new password doesn't match the new confirmation password.",
                status: 400
            });

            return response;
        }

        if (!confirmCurrentPassword || !newPassword || !confirmNewPassword) {
            return response;
        }

        response = await fetchRequest({
            url: `${serverVariable.serverPath}authentication/password`,
            method: HttpMethod.PUT,
            body: {
                confirmCurrentPassword,
                newPassword,
                confirmNewPassword,
            },
        });

        return response;
    }
} satisfies Actions;