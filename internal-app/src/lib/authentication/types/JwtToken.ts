import type {User} from "$lib/users/types/User";

export type JwtToken = {
    exp: number;
    iat: number;
    scopes: string;
    sub: string;
    userDetails: User;
};
