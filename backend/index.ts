import 'dotenv/config';
import express from 'express';
import { PrismaClient } from '@prisma/client'
import { ApolloServer } from 'apollo-server-express'
import cors from 'cors';
import cookieParser from 'cookie-parser';
import prismaAPI from './datasources/prismaAPI';
import resolvers from './resolvers';
import typeDefs from './schema';

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true
  })
);
app.use(cookieParser());

// PRISMA
const prisma = new PrismaClient()

// APOLLO
const dataSources = () => ({
  prismaAPI: new prismaAPI({ prisma }),
});

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources,
  context: ({ req, res }) => ({ req, res })
});

server.applyMiddleware({ app, cors: false });

app.listen( { port: 4000 }, () =>
  console.log(`Server ready at ${server.graphqlPath}`)
);