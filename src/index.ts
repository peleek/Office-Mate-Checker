import { ApolloServer } from 'apollo-server';
import gql from 'graphql-tag';
import mongoose from 'mongoose';

import { PostModel } from './models/Post';

const typeDefs = gql`
    type Post{
        id: ID!
        body: String!
        createdAt: String!
        username: String!
    }

    type Query{
        getPosts: [Post]
    }
`

const resolvers = {
    Query: {
        async getPosts() {
            try {
                const posts = await PostModel.find();
                return posts;
            } catch (err) {
                throw new Error(err)
            }
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

mongoose.connect('mongodb+srv://admin:TmSlGmMt2p28gm5q@cluster0-brsz2.mongodb.net/office-mate-checker?retryWrites=true&w=majority', { useNewUrlParser: true })
    .then(() => {
        console.log("Connected to database!")
        return server.listen({ port: 5000 })
    })
    .then(res => {
        console.log(`Server running at ${res.url}`)
    }).catch(err => console.log(err))

