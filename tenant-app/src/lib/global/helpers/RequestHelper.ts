import type {RequestOptions} from "$lib/global/types/RequestOptions";
import {
    InternalServerErrorException
} from "$lib/global/exceptions/InternalServerErrorException";
import {HttpMethod} from "$lib/global/enums/HttpMethod";
import type {ResponseDto} from "$lib/global/dtos/ResponseDto";
import {getTenantId} from "$lib/global/helpers/TenantInformation";

export const fetchRequest = async (options: RequestOptions): Promise<ResponseDto> => {
    options = await buildOptions(options);

    let response: Response;
    try {
        const requestInit = await buildRequestInit(options);

        response = await fetch(options.url, requestInit);
    } catch (exception: any) {
        throw new InternalServerErrorException(exception.message);
    }

    return buildResponse(response);
};

const buildOptions = async (options: RequestOptions): Promise<RequestOptions> => {
    if (!options) {
        throw new InternalServerErrorException("You must pass in request options.");
    }

    if (!options.url) {
        throw new InternalServerErrorException("You must provide a path with your request.");
    }

    if (!options.method) {
        throw new InternalServerErrorException("You must provide a method with your request.");
    }

    if (options.method === HttpMethod.POST || options.method === HttpMethod.PUT || options.method === HttpMethod.PATCH) {
        options.headers = {
            ...options.headers,
            "Content-Type": "application/json",
            Accept: "application/json"
        };
    }

    return options;
};

const buildRequestInit = async (options: RequestOptions): Promise<RequestInit> => {
    let requestInit: RequestInit = {
        method: options.method,
        headers: options.headers ?? {},
    };

    if (options.method === HttpMethod.POST || options.method === HttpMethod.PUT || options.method === HttpMethod.PATCH) {
        requestInit = {
            ...requestInit,
            body: JSON.stringify(options.body),
        };
    }

    requestInit.headers = {
        ...requestInit.headers,
        "tenant-id": options.subdomain ? await getTenantId(options.subdomain) : ""
    };

    return requestInit;
};

const buildResponse = async (response: Response): Promise<ResponseDto> => {
    let body;
    try {
        body = await response.json();
    } catch (exception: any) {
        if (!exception.message.includes("JSON")) {
            throw new InternalServerErrorException(exception.message);
        }
    }

    return body;
};
