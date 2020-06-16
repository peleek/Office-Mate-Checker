import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

import { UserInputError } from 'apollo-server';
import { UserModel, IUserSchema } from '../../models/User';
import { validateRegisterInput, validateLoginInput } from '../../util/validators';
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

			if (organizationResult.errors) {
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
