import { EventModel } from '../../models/Event';
import { checkAuth } from '../../util/checkAuth';

type EventInput = {
	startDate: string;
	endDate: string;
	description: string;
	token: string;
};

export const EventsResolvers = {
	Query: {
		async getUserEvents(_, { token }, context) {
			const user = checkAuth(context, token);
			try {
				const events = await EventModel.find({ creator: user.id });
				return events;
			} catch (err) {
				throw new Error(err);
			}
		},
	},

	Mutation: {
		async addEvent(_, { eventInput }, context) {
			try {
				const user = checkAuth(context, eventInput[0].token);
				eventInput.forEach(async (el) => {
					const event = new EventModel({
						startDate: el.startDate,
						endDate: el.endDate,
						description: el.description,
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
