import type HttpStatusCode from "$lib/global/enums/HttpStatusCode";

export class Exception extends Error {
	status: HttpStatusCode;
	timestamp: string;

	constructor(status: HttpStatusCode, message: string, name?: string) {
		super(message);
		this.status = status;
		this.name = name ?? "Exception";
		this.timestamp = new Date().toISOString();
		this.stack = new Error().stack;
	}
}
