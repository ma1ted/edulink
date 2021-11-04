import { uuid } from "https://deno.land/x/unique/uuid.ts";

enum EduLinkError {
	NetworkError,
	SchoolCodeError,
	ServerNameError,
}

export interface ErrorResponse {
	success: false;
	type: EduLinkError;
	message: string;
}

export interface SuccessResponse {
	success: true;
	server: string;
	id: string;
}

class Server {
	readonly code: string;

	public request(): Promise<SuccessResponse> {
		return new Promise((resolve, reject) => {
			const url = "https://provisioning.edulinkone.com/";
			const payload = {
				jsonrpc: "2.0",
				method: "School.FromCode",
				params: { code: this.code },
				uuid: uuid(),
				id: 1,
			};
			const options = {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(payload),
			};

			fetch(url, options)
				.then((result) => result.json())
				.then((json) => {
					if (json.result.success) {
						const res: SuccessResponse = {
							success: true,
							server: json.result.school.server,
							id: json.result.school.school_id,
						};
						resolve(res);
					} else {
						const errorMessage =
							`Invalid school code '${this.code}' supplied. If you are unsure, try your school's postcode.`;
						const res: ErrorResponse = {
							success: false,
							type: EduLinkError.SchoolCodeError,
							message: errorMessage,
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

	constructor(code: string) {
		this.code = code;
	}
}

export { EduLinkError, Server };
