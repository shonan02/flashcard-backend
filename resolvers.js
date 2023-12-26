const { GraphQLError } = require('graphql');
const Flashcard = require('./models/Flashcard');
const Subject = require('./models/Subject');
const Set = require('./models/Set');


const createSubject = async (name) => {
    //Find subject
    let subject = await Subject.findOne({ name : name });
    if(!subject) {
        subject = new Subject({ name: name });
        await subject.save();
    }
    return subject;
    
}

const resolvers = {
    Query: {
        allCards: async () => {
            const cards = await Flashcard.find({}).populate('subject');
            return cards;
        },
        allSubjects: async () => Subject.find({}),
        allSets: async () => {
            let sets = await Set.find({}).populate('cards').populate('subject');

            return sets;
        },
        cardCount: async () => Flashcard.collection.countDocuments(),
        findBySubject: async (root, args) => Flashcard.find({ subject: args.subject }),
        findSet: async (root, args) => {
            let set = await Set.findOne({ name: args.name}).populate('cards').populate('subject');

            return set;
        }

    },
    Mutation: {
        addCard: async (root, args) => {
            //Find subject
            const subject = await createSubject(args.subject);

            //Create flashcard object
            const card = new Flashcard({ ...args, subject: subject });

            await card.save();

            return card;
        },
        addSet: async (root, args) => {
            //Find subject or create one
            const subject = await createSubject(args.subject);

            // Using a ternary operator for concise code
            let set = subject
              ? new Set({ name: args.name, subject: subject })
              : new Set({ name: args.name });
          
            await set.save();
            return set;
        },
        addCardToSet: async (root, args) => {
            try {
                const card = Flashcard.findOne({ prompt: args.prompt});

                if(!card) {
                    throw new GraphQLError('Card not found', {
                        extensions: {
                            code: 'BAD_USER_INPUT',
                            invalidArgs: args.prompt
                        }
                    })
                }

                //Find the chosen set 
                const set = await Set.findOne({ name: args.name }).populate('subject').populate('cards');
                set.cards = set.cards.concat(card);
                await set.save();
                
                return set;

            } catch (err) {
                throw new GraphQLError('Error adding card to set', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                        error: err.toString()
                    }
                })
            }
        }
        
    }
}

module.exports = resolvers;