const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const depthLimit = require("graphql-depth-limit");
const {createComplexityLimitRule} = require("graphql-validation-complexity");
const jwt = require('jsonwebtoken');
const helmet = require('helmet');
const cors = require("cors");
const getUser = token => {
  if (token) {
    try {
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      throw new Error('Session Invalid');
    }
  }
};

require('dotenv').config();
const db = require('./db');
const models = require('./models');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
// why are we not importing the index module directly?

const DB_HOST = process.env.DB_HOST;
const port = process.env.PORT || 4000;

const app = express();
app.use(helmet());
app.use(cors());

db.connect(DB_HOST);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  validationRules: [depthLimit(5), createComplexityLimitRule(1000)],
  context: ({ req }) => {
    const token = req.headers.authorization;
    const user = getUser(token);
    console.log(user);
    return { models, user };
  }
});
server.applyMiddleware({ app, path: '/api' });

app.listen({ port }, () =>
  console.log(
    `graphql server listening on port http://localhost:${port}${server.graphqlPath}`
  )
);
