export const sortList = (a: string, b: string) => {
    return a.toLowerCase() < b.toLowerCase()
        ? -1
        : a.toLowerCase() > b.toLowerCase()
        ? 1
        : 0;
};
