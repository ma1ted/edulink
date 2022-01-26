import { uuid } from "https://deno.land/x/unique/uuid.ts";

import { User } from "./User.ts"

export interface LoginResponse {
	authtoken: string;
	school: {
		logo: string; // School logo (base 64)
		name: string; // School name
		id: string; // Establishment ID
		rooms: [
			{
				id: string;
				code: string;
				name: string;
			},
		];
		yearGroups: [
			{
				id: string;
				name: string;
			},
		];
		communityGroups: [
			{
				id: string;
				name: string;
			},
		];
		formGroups: [
			{
				id: string;
				name: string;
				yearGroupIDs: [string];
				employeeID: string;
				room_id: string;
			},
		];
		subjects?: [
			{
				id: string;
				name: string;
				active: boolean; // Whether the user is enrolled in the subject
			},
		];
	};
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
		};
	};
}

User.login = (school: SchoolResponse): Promise<LoginResponse> {
    return new Promise((resolve, reject) => {
        fetch(`${school.server}?method=EduLink.Login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-API-Method": "EduLink.Login",
            },
            body: JSON.stringify({
                "jsonrpc": "2.0",
                "method": "EduLink.Login",
                "params": {
                    "ui_info": {
                        "version": "4.0.48",
                        "git_sha": "",
                    },
                    "username": User.username,
                    "password": User.#password,
                    "establishment_id": school.id,
                },
                "uuid": uuid(),
                "id": "1",
            }),
        })
            .then((result) => result.json())
            .then((loginJson) => {
                if (loginJson.result.success) {
                    resolve({
                        authtoken: loginJson.result.authtoken,
                        school: {
                            logo: loginJson.result.establishment.logo,
                            name: loginJson.result.establishment.name,
                            rooms: loginJson.result.establishment.rooms,
                            yearGroups: loginJson.result.establishment.year_groups,
                            communityGroups: loginJson.result.establishment
                                .community_groups,
                            formGroups: loginJson.result.establishment.form_groups,
                            subjects: loginJson.result.establishment.subjects,
                        },
                        user: {
                            id: loginJson.result.user.id,
                            gender: loginJson.result.user.gender,
                            title: loginJson.result.user.title,
                            forename: loginJson.result.user.forename,
                            surname: loginJson.result.user.surname,
                            types: loginJson.result.user.types,
                            communityGroupID: loginJson.result.user.community_group_id,
                            formGroupID: loginJson.result.user.form_group_id,
                            yearGroupID: loginJson.result.user.year_group_id,
                            avatar: {
                                photo: loginJson.result.user.avatar.photo,
                                width: loginJson.result.user.avatar.width,
                                height: loginJson.result.user.avatar.height,
                            },
                        },
                    } as LoginResponse);
                } else {
                    reject(
                        new EduLink.EduLinkError(
                            loginJson.result.error,
                            EduLink.ErrorType.CredentialsError,
                        ),
                    );
                }
            })
            .catch((err) =>
                reject(
                    new EduLink.EduLinkError(
                        err.message,
                        EduLink.ErrorType.NetworkError,
                    ),
                )
            );
    });
}