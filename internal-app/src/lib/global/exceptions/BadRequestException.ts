import HttpStatusCode from "$lib/global/enums/HttpStatusCode";

export class BadRequestException extends Error {
	status = HttpStatusCode.ClientErrorBadRequest;

	constructor(message: string) {
		super(message);
		this.name = "BadRequest";
		this.stack = new Error().stack;
	}
}
