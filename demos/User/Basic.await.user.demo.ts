import { config } from "https://deno.land/x/dotenv/mod.ts";

import { School } from "../../src/School.ts"
import { User } from "../../src/User.ts"

const conf = config();

const school = await new School(conf.SCHOOL_CODE).request()

const user = await new User(conf.USERNAME, conf.PASSWORD).login(school)

