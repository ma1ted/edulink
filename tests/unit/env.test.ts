import { config } from "https://deno.land/x/dotenv/mod.ts";

const conf = config();

Deno.test("env vars", async () => {
	console.log(conf.SCHOOL_CODE);
    console.log(btoa(conf.SCHOOL_CODE));
});
