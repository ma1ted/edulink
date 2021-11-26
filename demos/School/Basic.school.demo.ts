// This simply gets the response object and displays it.

import { config } from "https://deno.land/x/dotenv/mod.ts";
import { School } from "../../src/School.ts"

const conf = config();

const school =  new School(conf.SCHOOL_CODE).request()
    .then(res => console.log(res))
    .catch(err => console.log(err));
    