const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');


const typeDefs = gql`
`

const resolvers = {
    Query: {

    },
    Mutation: {

    }
}
const server = new ApolloServer({
    
})

startStandaloneServer(server, {
    listen: { port: 4000 },
  }).then(({ url }) => {
    console.log(`Server ready at ${url}`)
  })