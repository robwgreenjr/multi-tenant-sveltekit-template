import type {Writable} from "svelte/store";
import type {Snackbar} from "$lib/global/types/Snackbar";
import {MessageSeverity} from "$lib/global/enums/MessageSeverity";
import type {ResponseDto} from "$lib/global/dtos/ResponseDto";

export const showMessage = (responseDto: ResponseDto,
                            snackBar: Writable<Snackbar>,
                            successMessage: Snackbar | null = null) => {
    if (!responseDto) return;

    if (responseDto.errors.length) {
        snackBar.set({
            message: responseDto.errors[0].message,
            severity: MessageSeverity.ERROR,
            show: true,
        });

        return;
    }

    if (successMessage) {
        snackBar.set(successMessage);
    }

    return;
}