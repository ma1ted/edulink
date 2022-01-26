import { uuid } from "https://deno.land/x/unique/uuid.ts";

import * as EduLink from "./EduLink.ts";


export class School {
	readonly schoolCode: string;

	constructor(schoolCode: string) {
		if (!schoolCode) {
			throw new EduLink.EduLinkError(
				"No school code supplied.",
				EduLink.ErrorType.SchoolDetailsError,
			);
		}
		this.schoolCode = schoolCode;
	}
}
