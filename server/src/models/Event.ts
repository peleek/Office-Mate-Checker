import { model, Schema } from 'mongoose';

export const eventSchema = new Schema({
	title: String,
	start: Date,
	end: Date,
	startStr: String,
	endStr: String,
	id: String,
	groupId: String,
	allDay: Boolean,
	url: String,
	display: String,
	startEditable: Boolean,
	durationEditable: Boolean,
	overlap: Boolean,
	backgroundColor: String,
	borderColor: String,
	textColor: String,
	creator: {
		type: Schema.Types.ObjectId,
		ref: 'User',
	},
});

export const EventModel = model('Event', eventSchema);
