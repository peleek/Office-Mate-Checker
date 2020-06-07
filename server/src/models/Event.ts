import { model, Schema } from 'mongoose';

export const eventSchema = new Schema({
	start: Number,
	end: Number,
	title: String,
	creator: {
		type: Schema.Types.ObjectId,
		ref: 'User',
	},
});

export const EventModel = model('Event', eventSchema);
