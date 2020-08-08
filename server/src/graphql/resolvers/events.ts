import { EventModel } from '../../models/Event';
import { checkAuth } from '../../util/checkAuth';
import { UserModel } from '../../models/User';

export const EventsResolvers = {
	Query: {
		async getUserEvents(_, { username }, context) {
			const user = checkAuth(context);
			try {
				let events = null;
				if (username) {
					const foundUser = await UserModel.findOne({ username });
					events = foundUser ? await EventModel.find({ creator: foundUser.id }) : [];
				} else events = await EventModel.find({ creator: user.id });
				return events;
			} catch (err) {
				throw new Error(err);
			}
		},
	},

	Mutation: {
		async updateEvents(_, { events }, context) {
			try {
				const user = checkAuth(context);
				await EventModel.deleteMany({ creator: user.id });
				events.forEach(async (el) => {
					const event = new EventModel({
						start: el.start,
						end: el.end,
						title: el.title,
						creator: user.id,
					});
					await event.save();
				});

				return {
					description: 'Events added successfully!',
				};
			} catch (err) {
				throw new Error(err);
			}
		},

		async addEvent(_, { event }, context) {
			try {
				const user = checkAuth(context);

				const newEvent = new EventModel({ ...event, creator: user.id, eventId: event.id });
				await newEvent.save();

				return {
					eventId: event.id,
				};
			} catch (err) {
				throw new Error(err);
			}
		},

		async changeEvent(_, { event }, context) {
			try {
				// const user = checkAuth(context);
				// await EventModel.deleteMany({ creator: user.id });
				// events.forEach(async (el) => {
				// 	const event = new EventModel({
				// 		start: el.start,
				// 		end: el.end,
				// 		title: el.title,
				// 		creator: user.id,
				// 	});
				// 	await event.save();
				// });

				return {
					description: 'Event changed successfully!',
				};
			} catch (err) {
				throw new Error(err);
			}
		},

		async removeEvent(_, { eventId }, context) {
			try {
				// const user = checkAuth(context);
				// await EventModel.deleteMany({ creator: user.id });
				// events.forEach(async (el) => {
				// 	const event = new EventModel({
				// 		start: el.start,
				// 		end: el.end,
				// 		title: el.title,
				// 		creator: user.id,
				// 	});
				// 	await event.save();
				// });

				return {
					description: 'remove added successfully!',
				};
			} catch (err) {
				throw new Error(err);
			}
		},
	},
};
