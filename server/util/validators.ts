export const validateRegisterInput = (
    username: string,
    email: string,
    password: string,
    confirmPassword: string
) => {
    const errors: Array<string> = []
    if (username.trim() === '') {
        errors.push(`Username can't be empty.`)
    }

    if (email.trim() === '') {
        errors.push(`Email can't be empty.`)
    } else {
        const emailRegex = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;

        if (!email.match(emailRegex)) {
            errors.push(`Email is not valid.`)
        }
    }

    if (password.trim() === '') {
        errors.push(`Please fill password field.`)
    } else if (password !== confirmPassword) {
        errors.push(`Passwords don't match.`)
    }

    if (password.length < 10) {
        errors.push(`Password should contain at least 10 characters`)
    }

    return errors;
}

export const validateLoginInput = (username: string, password: string) => {
    const errors: Array<string> = [];
    if (username.trim() === '') {
        errors.push(`Username can't be empty.`)
    }
    if (password.trim() === '') {
        errors.push(`Password can't be empty.`)
    }
    return errors;
}