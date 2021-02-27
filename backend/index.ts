import 'dotenv/config';
import express from 'express';
import { PrismaClient } from '@prisma/client'
import { ApolloServer } from 'apollo-server-express'
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { verify } from 'jsonwebtoken';
import prismaAPI from './datasources/prismaAPI';
import resolvers from './resolvers';
import typeDefs from './schema';
import { createAccessToken, createRefreshToken } from './lib/auth';
import { sendRefreshToken } from './lib/sendRefreshToken';

// PRISMA
const prisma: any = new PrismaClient()

const dataSources: any = () => ({
  prismaAPI: new prismaAPI({ prisma }),
});

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true
  })
);
app.use(cookieParser());

app.post('/refresh_token', async (req, res) => {
  const token = req.cookies.jid;
  if (!token) {
    console.log('token doesnt exist');
    return res.send({ ok: false, accessToken: ''});
  }

  let payload: any = null;
  try {
    payload = verify(token, process.env.REFRESH_TOKEN_SECRET!);
  } catch(err) {
    console.log(err)
    return res.send({ ok: false, accessToken: ''});
  }

  // token is valid and we can send back an access token
  const user = await prisma.user.findUnique({
    where: {
      id: payload.userId
    },
    select: {
      id: true,
      tokenVersion: true
    }
  });
  if (!user) {
    console.log('cant find user')
    return res.send({ ok: false, accessToken: ''});
  }

  if (user.tokenVersion !== payload.tokenVersion) {
    console.log('dont match')
    return res.send({ ok: false, accessToken: ''});
  }

  sendRefreshToken(res, createRefreshToken(user));

  return res.send({ ok: true, accessToken: createAccessToken(user)})
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