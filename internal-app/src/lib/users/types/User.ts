import type {Role} from "$lib/authorization/types/Role";

export type User = {
    id: number;
    createdOn: string;
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    roles: Role[];
    updatedOn: string;
};
