const { GraphQLServer } = require('graphql-yoga')
const fetch = require('node-fetch')

const baseURL = `https://swapi.co/api`

const resolvers = {
    Query: {
        users: () => {
            return fetch(`${baseURL}/people/1`).then(res => res.json())
        },
        user: (parent, args) => {
            const { id } = args
            return fetch(`${baseURL}/people/${id}`).then(res => res.json())
        },

    },

}

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    resolverValidationOptions: {
        requireResolversForResolveType: false
    }
})

server.start(() => console.log(`Server is running on http://localhost:4000`))