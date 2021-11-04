// This simply gets the response object and displays it.

import { config } from "https://deno.land/x/dotenv/mod.ts";
import * as Server from "../../src/Server.ts";
import * as School from "../../src/School.ts";
import { ErrorResponse, SuccessResponse } from "../../src/Server.ts";

const schoolCode = config().SCHOOL_CODE;

async function getSchoolName() {
	const serv = await new Server.Server(schoolCode)
		.request()
		.then((res: SuccessResponse) => {
			return res;
		})
		.catch((err: ErrorResponse) => {
			throw err.message;
		});

	if (serv.success) {
        const sch = await new School.School(serv)
            .request()
            .then((res: School.SuccessResponse) => {
                return res;
            })
            .catch((err: School.ErrorResponse) => {
                throw err.message;
            });

        if (sch.success) {
            return sch.schoolName;
        }
    }
}

const name = await getSchoolName()
console.log(name);