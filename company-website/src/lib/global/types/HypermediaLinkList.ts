import type { HypermediaLink } from "$lib/global/types/HypermediaLink";
import type { HypermediaDataLink } from "$lib/global/types/HypermediaDataLink";

export type HypermediaLinkList = {
	self: HypermediaLink;
	next?: HypermediaLink;
	data?: HypermediaDataLink[];
};
