import { config } from "https://deno.land/x/dotenv/mod.ts";
import { Server } from "../../src/Server.ts";

const schoolCode = config().SCHOOL_CODE;

new Server(schoolCode).request()
	.then(res => console.log(res))
	.catch(err => console.log(err));