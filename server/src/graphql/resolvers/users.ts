import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

import { UserInputError } from 'apollo-server';
import { UserModel, IUserSchema } from '../../models/User';
import {
	validateRegisterInput,
	validateLoginInput,
	validateChangedUserData,
	validatePasswords,
} from '../../util/validators';
import { checkAuth } from '../../util/checkAuth';
import { getOrganization } from '../../util/getOrganization';

const generateToken = (user: IUserSchema) => {
	return jwt.sign(
		{
			id: user.id,
			email: user.email,
			username: user.username,
		},
		`${process.env.SECRET_JWT_KEY}`,
		{ expiresIn: '1h' }
	);
};

export const UsersResolvers = {
	Query: {
		async getUsers(_, { usernamePart }, context) {
			checkAuth(context);
			try {
				const foundUsers = await UserModel.find({ username: { $regex: usernamePart, $options: 'i' } });
				return foundUsers.map((el) => el.username);
			} catch (err) {
				throw new Error(err);
			}
		},
	},

	Mutation: {
		async login(_, { username, password }) {
			const errors = validateLoginInput(username, password);
			const areThereAnyErrors = Object.values(errors).some((el) => el.length);

			if (areThereAnyErrors) {
				throw new UserInputError('Errors', {
					errors,
				});
			}

			const user = await UserModel.findOne({ username });

			if (!user) {
				throw new UserInputError('Errors', { errors: { username: ['Wrong credentials'] } });
			}

			const match = await bcrypt.compare(password, user.password);
			if (!match) {
				throw new UserInputError('Errors', { errors: { password: ['Wrong credentials'] } });
			}

			const token = generateToken(user);

			return {
				username: user.username,
				email: user.email,
				password: user.password,
				id: user.id,
				createdAt: user.createdAt,
				token,
			};
		},
		async changeUserData(_, { userData: { username, email } }, context) {
			const errors = validateChangedUserData(username, email);
			const currentUser = checkAuth(context);

			const areThereAnyErrors = Object.values(errors).some((el) => el.length);
			if (areThereAnyErrors) {
				throw new UserInputError('Errors during user data change', {
					errors,
				});
			}

			const existingUser = (await UserModel.findOne({ username }))?.username;
			const existingEmail = (await UserModel.findOne({ email }))?.email;

			if (
				(existingUser && existingUser !== currentUser.username) ||
				(existingEmail && existingEmail !== currentUser.email)
			) {
				throw new UserInputError('errors', {
					errors: {
						username: existingUser !== currentUser.username ? ['User already exists'] : [],
						email: existingEmail !== currentUser.email ? ['Email already exists'] : [],
					},
				});
			}

			const newUser = await UserModel.updateOne({ _id: currentUser.id }, { $set: { username, email } });
			return {
				token: generateToken(newUser),
			};
		},

		async changePassword(_, { currentPassword, newPassword, confirmedNewPassword }, context) {
			const user = checkAuth(context);
			const userCurrentPassword = await (await UserModel.findById(user.id)).password;
			const errors = await validatePasswords(
				userCurrentPassword,
				currentPassword,
				newPassword,
				confirmedNewPassword
			);
			const areThereAnyErrors = Object.values(errors).some((el) => el.length);
			if (areThereAnyErrors) {
				throw new UserInputError('Errors during user password change', {
					errors,
				});
			}
			const hashedPassword = await bcrypt.hash(newPassword, 12);

			await UserModel.updateOne({ _id: user.id }, { $set: { password: hashedPassword } });

			return {
				description: 'Password changed successfully!',
			};
		},

		async deleteUser(_, { currentPassword }, context) {
			const user = checkAuth(context);
			const userCurrentPassword = await (await UserModel.findById(user.id)).password;
			const isPasswordMatch = await bcrypt.compare(currentPassword, userCurrentPassword);

			if (!isPasswordMatch) {
				throw new UserInputError('Errors during user deletion', {
					errors: {
						currentPassword: `Password doesn't match`,
					},
				});
			}

			await UserModel.deleteOne({ _id: user.id });

			return {
				description: 'User deleted successfully!',
			};
		},

		async register(
			_,
			{ registerInput: { username, email, password, confirmPassword, organizationCode, organizationName } }
		) {
			const errors = validateRegisterInput(
				username,
				email,
				password,
				confirmPassword,
				organizationCode,
				organizationName
			);
			const areThereAnyErrors = Object.values(errors).some((el) => el.length);

			if (areThereAnyErrors) {
				throw new UserInputError('Errors in register form', {
					errors,
				});
			}

			const hashedPassword = await bcrypt.hash(password, 12);
			const user = await UserModel.findOne({ username });
			if (user) {
				throw new UserInputError('Username is taken', {
					errors: {
						...errors,
						username: ['This username is taken'],
					},
				});
			}
			const organizationResult = await getOrganization(organizationCode, organizationName);
			const areThereAnyOrganizationErrors = Object.values(organizationResult.errors).some((el) => el.length);

			if (areThereAnyOrganizationErrors) {
				throw new UserInputError(`Problem with organization`, {
					errors: {
						...organizationResult.errors,
					},
				});
			}
			const organization = await organizationResult.organization.save();

			const newUser = new UserModel({
				email,
				username,
				password: hashedPassword,
				createdAt: new Date().toISOString(),
				organization: organization.id,
			});

			const res = await newUser.save();
			const token = generateToken(res);

			return {
				username: res.username,
				email: res.email,
				password: res.password,
				id: res.id,
				createdAt: res.createdAt,
				token,
				organizationName: organization.organizationName,
				organizationCode: organization.organizationCode,
			};
		},
	},
};
