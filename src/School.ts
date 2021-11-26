import { uuid } from "https://deno.land/x/unique/uuid.ts";

enum EduLinkError {
    NetworkError,
    ProvisioningError,
    SchoolDetailsError,
}

export interface SchoolResponse {
    server: string;
    id: string;
    name: string;
    externalLogins: {
        google: string | null;
        microsoft: string | null;
    };
    externalLoginsOnly: boolean;
    logo: string;
}
export interface SchoolError {
    type: EduLinkError;
    message: string;
}

export class School {
    readonly schoolCode: string;

    public request(): Promise<SchoolResponse> {
        return new Promise((resolve, reject) => {
            // Provision server
            fetch("https://provisioning.edulinkone.com/?method=School.FromCode", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "jsonrpc": "2.0",
                    "method": "School.FromCode",
                    "params": {
                        "code": this.schoolCode
                    },
                    "uuid": uuid(),
                    "id":"1"
                })
            })
            .then(result => result.json())
            .then(provisioningJson => {
                if (provisioningJson.result.success) {
                    fetch(`${provisioningJson.result.school.server}?method=EduLink.SchoolDetails`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "X-API-Method": "EduLink.SchoolDetails"
                        },
                        body: JSON.stringify({
                            "jsonrpc": "2.0",
                            "method": "EduLink.SchoolDetails",
                            "params": {
                                "establishment_id": provisioningJson.result.school.school_id.toString(),
                                "from_app": false
                            },
                            "uuid": uuid(),
                            "id": "1"
                        })
                    })
                    .then(result => result.json())
                    .then(detailsJson => {
                        if (detailsJson.result.success) {
                            resolve({
                                server: provisioningJson.result.school.server,
                                id: provisioningJson.result.school.school_id,
                                name: detailsJson.result.establishment.name,
                                externalLogins: {
                                    google: detailsJson.result.establishment.idp_login.google ?? null,
                                    microsoft: detailsJson.result.establishment.idp_login.microsoft ?? null
                                },
                                externalLoginsOnly: detailsJson.result.establishment.idp_only,
                                logo: detailsJson.result.establishment.logo,
                            });
                        } else {
                            reject({
                                type: EduLinkError.SchoolDetailsError,
                                message: detailsJson.result.message
                            } as SchoolError)
                        }
                    })
                    .catch(err => reject({
                        type: EduLinkError.NetworkError,
                        message: err.message
                    } as SchoolError))
                } else {
                    reject({
                        type: EduLinkError.ProvisioningError,
                        message: provisioningJson.result.message
                    });
                }
            })
            .catch(err => reject({
                type: EduLinkError.NetworkError,
                message: err.message
            } as SchoolError))
        });
    }

	constructor(schoolCode: string) {
		this.schoolCode = schoolCode;
	}
}
