import type {ResponseDto} from "$lib/global/dtos/ResponseDto";
import {fetchRequest} from "$lib/global/helpers/RequestHelper";
import {HttpMethod} from "$lib/global/enums/HttpMethod";

export type ScrollResponse = {
    response: ResponseDto,
    lastHrefCalled: string
}

export type ScrollOptions = {
    event: Event,
    threshold: number,
    lastHrefCalled: string,
    response: ResponseDto
}

export const scrollQuery = async (options: ScrollOptions): Promise<ScrollResponse | null> => {
    if (!options.response) {
        return null;
    }

    if (!options.threshold) {
        options.threshold = 100;
    }

    const response = options.response;
    const target = (options.event.target as HTMLDivElement);
    const offset = target.scrollHeight - target.clientHeight - target.scrollTop;

    if (offset >= options.threshold) return null;
    if (!response.links.next || (options.lastHrefCalled && options.lastHrefCalled === response.links.next.href)) {
        return null;
    }

    const newData = await fetchRequest({
        url: `/api/query`,
        method: HttpMethod.POST,
        body: {
            url: response.links.next.href,
        },
    });

    return {
        lastHrefCalled: response.links.next.href,
        response: {
            ...response,
            data: [...options.response.data, ...newData.data],
            links: newData.links
        }
    };
}