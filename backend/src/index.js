/* eslint-disable no-console */
import express from 'express';
import { ApolloServer, PubSub } from 'apollo-server-express';
import cors from 'cors';

import { PORT, HOST } from './config';

import mongoDBConnect from './middleware/mongoDBConnect';

import typeDefs from './typeDefs';
import resolvers from './resolvers';

// Express Middleware
const app = express();
app.use(cors());
// https://github.com/kettanaito/graphql-server/blob/master/source/app.js

// Subscription
const pubsub = new PubSub();

// Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req, pubsub }),
  uploads: {
    maxFileSize: 10000000, // 10 MB
    maxFiles: 20,
  },
});

// ApplyMiddleware
server.applyMiddleware({ app });

const startServer = async () => {
  try {
    await mongoDBConnect();

    const listener = app.listen(PORT, HOST, () => {
      console.log(
        `🚀 Server ready at http://${listener.address().address}:${PORT}${
          server.graphqlPath
        }`
      );
    });
  } catch (err) {
    console.log(`💥 Server Error: ${err.message}`);
  }
};

startServer();
