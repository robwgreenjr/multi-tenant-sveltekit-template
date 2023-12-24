export const getCookie = (cookies: string, name: string): string => {
    const value = `; ${cookies}`;
    const parts = value.split(`; ${name}=`);

    if (!parts || parts.length !== 2) {
        return "";
    }

    const result = parts.pop()?.split(";").shift();
    if (!result) {
        return "";
    }

    return result;
};
