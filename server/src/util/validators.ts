export const validateRegisterInput = (
	username: string,
	email: string,
	password: string,
	confirmPassword: string,
	ogranizationCode: string,
	ogranizationName: string
) => {
	const errors = {
		username: [] as Array<string>,
		password: [] as Array<string>,
		confirmPassword: [] as Array<string>,
		email: [] as Array<string>,
		ogranizationName: [] as Array<string>,
		ogranizationCode: [] as Array<string>,
	};
	if (username.trim() === '') {
		errors.username.push(`Username can't be empty.`);
	}

	if (email.trim() === '') {
		errors.email.push(`Email can't be empty.`);
	} else {
		const emailRegex = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;

		if (!email.match(emailRegex)) {
			errors.email.push(`Email is not valid.`);
		}
	}

	if (password.trim() === '') {
		errors.password.push(`Please fill password field.`);
	} else if (password !== confirmPassword) {
		errors.confirmPassword.push(`Passwords don't match.`);
	}

	if (password.length < 10) {
		errors.password.push(`Password should contain at least 10 characters`);
	}

	if (!ogranizationName && ogranizationCode.trim() === '') {
		errors.ogranizationCode.push('Organization code is empty.');
	}

	if (!ogranizationCode && ogranizationName.trim() === '') {
		errors.ogranizationName.push('Organization name is empty.');
	}

	return errors;
};

export const validateLoginInput = (username: string, password: string) => {
	const errors = {
		username: [] as Array<string>,
		password: [] as Array<string>,
	};

	if (username.trim() === '') {
		errors.username.push(`Username can't be empty.`);
	}
	if (password.trim() === '') {
		errors.password.push(`Password can't be empty.`);
	}

	return errors;
};
