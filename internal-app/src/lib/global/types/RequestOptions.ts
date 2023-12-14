import type { HttpMethod } from "$lib/global/enums/HttpMethod";

export type RequestOptions = {
	url: string;
	method: HttpMethod;
	headers?: any;
	body?: any;
};
