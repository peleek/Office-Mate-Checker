import { PostsResolvers } from './posts'
import { UsersResolvers } from './users'

export const resolvers = {
    Query: {
        ...PostsResolvers.Query
    },
    Mutation: {
        ...UsersResolvers.Mutation
    }
}   