//MongoDB configuration
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const mongoURI = 'mongodb+srv://root:root@cluster1.sqbexiy.mongodb.net/flashcards?retryWrites=true&w=majority';

const dbConnection = async () => {
    mongoose.connect(mongoURI)
    .then(() => {
        console.log('connected to mongoDB')
    })
    .catch((error) => {
        console.log(`error connecting to ${error.message}`);
    })

}

module.exports = dbConnection;