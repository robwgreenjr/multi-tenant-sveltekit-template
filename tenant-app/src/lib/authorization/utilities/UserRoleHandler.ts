import type {Role} from "../types/Role";

export const countUserRole = (userRoles: any[], role: Role) => {
    let count = 0;

    for (const userRole of userRoles) {
        if (userRole.role.id === role.id) {
            count += 1;
        }
    }

    return count;
};
