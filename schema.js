const typeDefs = `
    type Flashcard{
        prompt: String!,
        definition: String!
        subject: Subject!
    }

    type Subject {
        name: String!
    }

    type Set {
        name: String!
        cards: [Flashcard!]!
        subject: Subject!
    }

    type Set{
        subject: Subject!
        cards: [Flashcard!]!
    }
    type User{
        username: String!
        password: String!
        id: ID!
    }

    type Query {
        allCards: [Flashcard!]!
        allSubjects: [Subject!]!
        allSets: [Set!]!
        cardCount: Int!
        findBySubject(subject: String!): [Flashcard!]!
        findSet(name: String!): Set
    }

    type Mutation {
        addCard(
            prompt: String!
            definition: String!
            subject: String!
        ): Flashcard
        addSet(
            name: String!
            subject: String
        ): Set
        addCardToSet(
            prompt: String!
            name: String!
        ): Set
    }
`

module.exports = typeDefs;