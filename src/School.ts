import { uuid } from "https://deno.land/x/unique/uuid.ts";
import * as Server from "./Server.ts";

enum EduLinkError {
	NetworkError,
	SchoolCodeError,
	SchoolDetailsError,
}

export interface ErrorResponse {
	success: false;
	type: EduLinkError;
	message: string;
}

export interface SuccessResponse {
	success: true;
	schoolName: string;
	externalLoginOnly: boolean;
	externalLogins: Object;
	logo: string;
}

class School {
	readonly serverResponse: Server.SuccessResponse;

	public async request(): Promise<SuccessResponse> {
		return new Promise((resolve, reject) => {
			/*`${this.serverResponse.server}/?method=EduLink.SchoolDetails`;*/
			const url = this.serverResponse.server;
			const payload = {
				jsonrpc: "2.0",
				method: "EduLink.SchoolDetails",
				params: {
					establishment_id: this.serverResponse.id.toString(),
					from_app: false,
				},
				uuid: uuid(),
				id: 1,
			};
			const options = {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"X-API-Method": "EduLink.SchoolDetails",
				},
				body: JSON.stringify(payload),
			};

			fetch(url, options)
				.then((result) => result.json())
				.then((json) => {
					if (json.result.success) {
						let res: SuccessResponse = {
							success: true,
							schoolName: json.result.establishment.name,
							externalLoginOnly: json.result.establishment.idp_only,
							externalLogins: json.result.establishment.idp_login,
							logo: json.result.establishment.logo,
						};
						resolve(res);
					} else {
						const res: ErrorResponse = {
							success: false,
							type: EduLinkError.SchoolDetailsError,
							message: json.result.error,
						};
						reject(res);
					}
				})
				.catch((err) => {
					const res: ErrorResponse = {
						success: false,
						type: EduLinkError.NetworkError,
						message: err.message,
					};
					reject(res);
				});
		});
	}

	constructor(server: Server.SuccessResponse) {
		this.serverResponse = server;
	}
}

export { EduLinkError, School };
