import type { User } from "$lib/users/types/User";
import type { Permission } from "./Permission";

export type Role = {
	id: number;
	name: string;
	description: string;
	permissions: Permission[];
	users: User[];
};
