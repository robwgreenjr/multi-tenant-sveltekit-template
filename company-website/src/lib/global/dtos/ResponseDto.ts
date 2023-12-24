import type { ErrorResponse } from "$lib/global/types/ErrorResponse";
import type { MetaQuery } from "$lib/global/types/MetaQuery";
import type { HypermediaLinkList } from "$lib/global/types/HypermediaLinkList";

export type ResponseDto = {
	data: any[];
	errors: ErrorResponse[];
	links: HypermediaLinkList;
	meta: MetaQuery;
};
