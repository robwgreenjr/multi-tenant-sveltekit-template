import type { HypermediaLink } from "$lib/global/types/HypermediaLink";

export type HypermediaDataLink = HypermediaLink & {
	index: number;
};
