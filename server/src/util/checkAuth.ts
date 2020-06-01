import { AuthenticationError } from 'apollo-server';
import jwt from 'jsonwebtoken';

export const checkAuth = (context, passedToken?) => {
	// context = { ... headers }
	const authHeader = context.req?.headers.authorization;
	if (authHeader || passedToken) {
		// Bearer ....
		const token = passedToken || authHeader.split('Bearer ')[1];
		if (token) {
			try {
				const user = jwt.verify(token, `${process.env.SECRET_JWT_KEY}`) as any;
				return user;
			} catch (err) {
				throw new AuthenticationError('Invalid/Expired token');
			}
		}
		throw new Error("Authentication token must be 'Bearer [token]");
	}
	throw new Error('Authorization header must be provided');
};
