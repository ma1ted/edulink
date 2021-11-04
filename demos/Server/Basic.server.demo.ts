// This simply gets the response object and logs it.

import { config } from "https://deno.land/x/dotenv/mod.ts";
import { ErrorResponse, Server, SuccessResponse } from "../../src/Server.ts";

const schoolCode = config().SCHOOL_CODE;

new Server(schoolCode)
	.request()
	.then((res: SuccessResponse) => {
		console.log(res.server);
	})
	.catch((err: ErrorResponse) => {
		console.log(err.message);
	});