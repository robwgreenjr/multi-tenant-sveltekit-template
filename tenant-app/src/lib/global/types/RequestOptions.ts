import type {HttpMethod} from "$lib/global/enums/HttpMethod";

export type RequestOptions = {
    url: string;
    method: HttpMethod;
    subdomain?: URL;
    headers?: any;
    body?: any;
};
