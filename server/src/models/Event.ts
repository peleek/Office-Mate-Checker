import { model, Schema } from 'mongoose';

export const eventSchema = new Schema({
	title: String,
	start: Date,
	end: Date,
	id: String,
	eventId: String,
	creator: {
		type: Schema.Types.ObjectId,
		ref: 'User',
	},
});

export const EventModel = model('Event', eventSchema);
