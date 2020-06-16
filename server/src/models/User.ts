import { Schema, model, Model, Document } from 'mongoose';

export interface IUserSchema extends Document {
	username: string;
	password: string;
	email: string;
	createdAt: string;
	organization: string;
}

const userSchema = new Schema({
	username: String,
	password: String,
	email: String,
	createdAt: String,
	organization: {
		type: Schema.Types.ObjectId,
		ref: 'Organization',
	},
});

export const UserModel = model<IUserSchema, Model<IUserSchema>>('User', userSchema);
