import {writable} from "svelte/store";
import {browser} from "$app/environment";

const LOCAL_STORAGE = "givenWelcomeMessage";

export const givenWelcomeMessage = writable<boolean>(false);

if (browser) {
    givenWelcomeMessage.set(!!localStorage.getItem(LOCAL_STORAGE));
    givenWelcomeMessage.subscribe(value => {
        if (value) {
            localStorage.setItem(LOCAL_STORAGE, "1");
        } else {
            localStorage.removeItem(LOCAL_STORAGE)
        }
    });
}
