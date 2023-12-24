import HttpStatusCode from "$lib/global/enums/HttpStatusCode";

export class InternalServerErrorException extends Error {
	status = HttpStatusCode.ServerErrorInternal;

	constructor(message: string) {
		super(message);
		this.name = "InternalServerError";
		this.stack = new Error().stack;
	}
}
