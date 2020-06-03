import { model, Schema } from 'mongoose';

export const eventSchema = new Schema({
	startDate: String,
	endDate: String,
	title: String,
	creator: {
		type: Schema.Types.ObjectId,
		ref: 'User',
	},
});

export const EventModel = model('Event', eventSchema);
