import { PrismaClient } from '@prisma/client'
import { ApolloServer, gql } from 'apollo-server'
import prismaAPI from './datasources/prismaAPI';
import resolvers from './resolvers';
import typeDefs from './schema';

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
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
})