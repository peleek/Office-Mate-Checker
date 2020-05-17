import { Schema, model, Model, Document } from 'mongoose'

export interface IUserSchema extends Document {
    username: string,
    password: string,
    email: string,
    createdAt: string,
}

const userSchema = new Schema({
    username: String,
    password: String,
    email: String,
    createdAt: String,

})

export const UserModel = model<IUserSchema, Model<IUserSchema>>('User', userSchema);    