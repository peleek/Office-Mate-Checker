import { EventModel } from '../../models/Event';
import { checkAuth } from '../../util/checkAuth';

export const EventsResolvers = {
	Query: {
		async getUserEvents(_, {}, context) {
			const user = checkAuth(context);
			try {
				const events = await EventModel.find({ creator: user.id });
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
						startDate: el.startDate,
						endDate: el.endDate,
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
	},
};
