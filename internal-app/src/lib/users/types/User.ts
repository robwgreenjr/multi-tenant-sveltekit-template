import type {Role} from "$lib/authorization/types/Role";

export type User = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    createdOn: string;
    updatedOn: string;
    roles: Role[];
};
