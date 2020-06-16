import * as crypto from 'crypto';
import { OrganizationModel, IOrganizationSchema } from '../models/Organization';

type OrganizationResult = {
	organization: IOrganizationSchema;
	errors: { organizationCode: Array<string>; organizationName: Array<string> };
};

export const getOrganization = async (organizationCode, organizationName): Promise<OrganizationResult> => {
	let organization;
	const errors = {
		organizationCode: [],
		organizationName: [],
	};
	if (!organizationName && organizationCode) {
		organization = await OrganizationModel.findOne({ organizationCode });

		if (!organization) {
			errors.organizationCode.push(`Organization with given code doesn't exist`);
			return {
				organization,
				errors,
			};
		}
	}

	if (!organizationCode && organizationName) {
		organization = await OrganizationModel.findOne({ organizationName });

		if (organization) {
			errors.organizationName.push('Organization with given name already exists.');

			return {
				organization,
				errors,
			};
		}

		const organizationCodeString = crypto.randomBytes(20).toString('hex');
		return {
			organization: new OrganizationModel({
				organizationName,
				organizationCode: organizationCodeString,
			}),
			errors: null,
		};
	}

	return {
		organization,
		errors,
	};
};
