import { model, Schema } from 'mongoose';

const eventSchema = new Schema({
	startDate: String,
	endDate: String,
	name: String,
	user: {
		type: Schema.Types.ObjectId,
		ref: 'users',
	},
});

export const EventModel = model('Event', eventSchema);
