const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');


const typeDefs = gql`
    Flashcard {
        Prompt: String!,
        Definition: String!
        Subject: Subject!
    }

    Subject {
        name: String!
    }

    Set {
        Subject: Subject!
        Cards: [Flashcard!]!
    }

    User{
        username: String!
        password: String!
    }
`

const resolvers = {
    Query: {

    },
    Mutation: {

    }
}
const server = new ApolloServer({
    typeDefs,
    resolvers
})

startStandaloneServer(server, {
    listen: { port: 4000 },
  }).then(({ url }) => {
    console.log(`Server ready at ${url}`)
  })