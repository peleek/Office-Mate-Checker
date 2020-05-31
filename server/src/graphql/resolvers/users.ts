import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { UserInputError } from 'apollo-server';

import { UserModel, IUserSchema } from '../../models/User';
import { validateRegisterInput, validateLoginInput } from '../../../util/validators';

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
		async register(_, { registerInput: { username, email, password, confirmPassword } }) {
			// TODO: validate user data
			const errors = validateRegisterInput(username, email, password, confirmPassword);
			const areThereAnyErrors = Object.values(errors).some((el) => el.length);

			if (areThereAnyErrors) {
				throw new UserInputError('Errors in register form', {
					errors,
				});
			}
			// TODO: make sure that user doesn't already exist

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
			const newUser = new UserModel({
				email,
				username,
				hashedPassword,
				createdAt: new Date().toISOString(),
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
			};
		},
	},
};
