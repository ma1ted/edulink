import { uuid } from "https://deno.land/x/unique/uuid.ts";

import * as EduLink from "./EduLink.ts";
import { SchoolResponse } from "./School.ts";

export interface LoginResponse {
    logo: string; // School logo (base 64)
    name: string; // School name
    id: string; // Establishment ID
    rooms: [
        {
            id: string;
            code: string;
            name: string;
        }
    ];
    yearGroups: [
        {
            id: string;
            name: string;
        }
    ];
    communityGroups: [
        {
            id: string;
            name: string;
        }
    ];
    formGroups: [
        {
            id: string;
            name: string;
            yearGroupIDs: [string];
            employeeID: string;
            room_id: string;
        }
    ];
    subjects?: [
        {
            id: string;
            name: string;
            active: boolean; // Whether the user is enrolled in the subject
        }
    ]
    authtoken: string;
    user: {
        id: string;
        gender: string;
        title?: string;
        forename: string;
        surname: string;
        types: [string];
        communityGroupID: string;
        formGroupID: string;
        yearGroupID: string;
        avatar: {
            photo: string; // Base 64
            width: number;
            height: number;
        }
        
    }
}

export class User {
    readonly username: string;
    #password: string;

    public login(school: SchoolResponse): Promise<LoginResponse> {
        return new Promise((resolve, reject) => {
            fetch(`${school.server}?method=EduLink.Login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-API-Method": "EduLink.Login"
                },
                body: JSON.stringify({
                    "jsonrpc": "2.0",
                    "method": "EduLink.Login",
                    "params": {
                        "username": this.username,
                        "password": this.#password,
                        "establishment_id": 2
                    },
                    "uuid": uuid(),
                    "id": "1"
                })
            })
            .then(result => result.json())
            .then(loginJson => {
                console.log(loginJson)
            })
            .catch(err => reject(new EduLink.EduLinkError(err.message, EduLink.ErrorType.NetworkError)))
        });
    }

	constructor(username: string, password: string) {
        if (!username) throw new EduLink.EduLinkError("No username supplied.", EduLink.ErrorType.CredentialsError);
        if (!password) throw new EduLink.EduLinkError("No password supplied.", EduLink.ErrorType.CredentialsError);
		
        this.username = username;
        this.#password = password;
	}
}
