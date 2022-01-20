import { assertEquals } from "https://deno.land/std@0.112.0/testing/asserts.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";

import { School } from "../../src/School.ts";

const conf = config();

Deno.test("School.request()", async () => {
	const school = await new School(conf.SCHOOL_CODE).request();

	assertEquals(school.name, conf.SCHOOL_NAME);
});
