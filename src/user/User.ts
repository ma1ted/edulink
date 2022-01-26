import * as EduLink from "./EduLink.ts";
import { SchoolResponse } from "./School.ts";



export class User {
	readonly username: string;
	#password: string;

	

	constructor(username: string, password: string) {
		if (!username) {
			throw new EduLink.EduLinkError(
				"No username supplied.",
				EduLink.ErrorType.CredentialsError,
			);
		}
		if (!password) {
			throw new EduLink.EduLinkError(
				"No password supplied.",
				EduLink.ErrorType.CredentialsError,
			);
		}

		this.username = username;
		this.#password = password;
	}
}
