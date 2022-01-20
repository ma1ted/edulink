import { assertEquals } from "https://deno.land/std@0.112.0/testing/asserts.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";

import { School } from "../../src/School.ts";
import { User } from "../../src/User.ts";

const conf = config();

Deno.test("User.login()", async () => {
	const school = await new School(conf.SCHOOL_CODE).request();

	const user = await new User(conf.USERNAME, conf.PASSWORD).login(school);

	assertEquals(user.user.forename, conf.FORENAME);
});
