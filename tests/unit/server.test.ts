import { assert } from "https://deno.land/std@0.112.0/testing/asserts.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";
import * as Server from "../src/Server.ts";

const schoolCode = config().SCHOOL_CODE;

Deno.test("Assert successful response", async () => {
	let success = await new Server(schoolCode).request()
		.then((response: Response) => {
			return response.success;
		})
		.catch((err) => {
			console.log(err);
		});

	assert(success);
});
