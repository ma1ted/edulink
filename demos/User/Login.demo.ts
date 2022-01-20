import { config } from "https://deno.land/x/dotenv/mod.ts";

import { School } from "../../src/School.ts";
import { User } from "../../src/User.ts";

const conf = config();

new School(conf.SCHOOL_CODE).request()
	.then((school) => {
		new User(conf.USERNAME, conf.PASSWORD).login(school)
			.then((user) => {
				console.log(user);
			})
			.catch((err) => {
				console.log(err);
			});
	})
	.catch((err) => {
		console.log(err);
	});
