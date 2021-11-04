import { uuid } from "https://deno.land/x/unique/uuid.ts";

enum EduLinkError {
    NetworkError,
    SchoolCodeError,
    ServerNameError,
}

interface ErrorResponse {
    success: false;
    type: EduLinkError;
    message: string;
}

interface SuccessResponse {
    success: true;
}

class EduLink {
    public async request(): Promise<SuccessResponse> {
        return new Promise((resolve, reject) => {
            const url = "";
            const payload = {};
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

export { EduLinkError, ErrorResponse, SuccessResponse }