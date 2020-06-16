import { Schema, model, Model, Document } from 'mongoose';

export interface IOrganizationSchema extends Document {
	organizationName: string;
	organizationCode: string;
}

const OrganizationSchema = new Schema<IOrganizationSchema>({
	organizationCode: String,
	organizationName: String,
});

export const OrganizationModel = model<IOrganizationSchema, Model<IOrganizationSchema>>(
	'Organization',
	OrganizationSchema
);
