import { ApolloServer } from 'apollo-server';
import mongoose from 'mongoose';
import { config as dotEnvConfig } from 'dotenv'
import { resolvers } from './graphql/resolvers';
import { typeDefs } from './graphql/typeDefs';

dotEnvConfig();

const server = new ApolloServer({
    typeDefs,
    resolvers
})

mongoose.connect(`${process.env["MONGODB"]}`, { useNewUrlParser: true })
    .then(() => {
        console.log("Connected to database!")
        return server.listen({ port: 5000 })
    })
    .then(res => {
        console.log(`Server running at ${res.url}`)
    }).catch(err => console.log(err))

