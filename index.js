require('dotenv').config();

//Apollo server configuration
const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const { expressMiddleware } = require('@apollo/server/express4');
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer');
const { makeExecutableSchema } = require('@graphql-tools/schema');


const typeDefs = require('./schema');
const resolvers = require('./resolvers');


//Express middleware configuration
const express = require('express');
const cors = require('cors');
const http = require('http');

//DB connection
const dbConnection = require('./db');
dbConnection();

//Setup function
const start = async () => {
    //Express app
    const app = express();
    const httpServer = http.createServer();

    //Apollo server   
    const server = new ApolloServer({
        schema: makeExecutableSchema({ typeDefs, resolvers }),
        //Middleware to ensure safe shutting of the server
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
    })

    await server.start();

    //Configure middleware
    app.use('/',
        cors(),
        express.json(),
        expressMiddleware({ app: server })
    )


    const PORT = 4000;

    httpServer.listen(PORT, () => {
        console.log(`Server is now running http://localhost:${PORT}`);
    })
}

start();