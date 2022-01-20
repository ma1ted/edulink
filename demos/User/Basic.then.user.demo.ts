import { config } from "https://deno.land/x/dotenv/mod.ts";

import { School } from "../../src/School.ts"
import { User } from "../../src/User.ts"

const conf = config();

const s = new School(conf.SCHOOL_CODE).request()
    .then(school => {
        const u = new User(conf.USERNAME, conf.PASSWORD).login(school)
            .then(user => {
                console.log(u)
                console.log(user)
            })
            .catch(err => {
                console.log(err)
            })
    })
    .catch(err => {
        console.log(err);
    })
