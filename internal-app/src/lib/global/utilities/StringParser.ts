export const camelCaseToNormal = (string: string): string => {
    return string
        .replace(/(_|-)/g, " ")
        .trim()
        .replace(/\w\S*/g, function (str) {
            return str.charAt(0).toUpperCase() + str.substr(1);
        })
        .replace(/([a-z])([A-Z])/g, "$1 $2")
        .replace(/([A-Z])([A-Z][a-z])/g, "$1 $2");
};

/**
 *
 * @param url
 */
export const cleanUrl = (url: string): string => {
    return url[url.length - 1] === "/" ? url.slice(0, -1) : url;
};
