export enum ErrorType {
	NetworkError,
	SchoolCodeError,
	ProvisioningError,
	SchoolDetailsError,
	CredentialsError,
}

export class EduLinkError extends Error {
	public readonly type: ErrorType;
	public readonly message: string;

	constructor(message: string, type: ErrorType) {
		super(message);

		// Set the prototype explicitly.
		Object.setPrototypeOf(this, EduLinkError.prototype);

		this.type = type;
		this.message = message;
	}
}
