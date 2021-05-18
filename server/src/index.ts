import { ApolloServer } from 'apollo-server-express';
import connectRedis from 'connect-redis';
import cors from "cors";
import { config } from "dotenv";
import Express from "express";
import session from "express-session";
import Redis from 'ioredis';
import 'reflect-metadata';
import { buildSchema } from "type-graphql";
import { COOKIE_NAME, __prod__ } from './constants';
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/post";
import { UserResolver } from './resolvers/user';
import { createConnection } from "typeorm"
import { Post } from "./entities/Post";
import { User } from "./entities/User";


config()
const { secretKey, pgUser, pgPass, dbName } = process.env
const parsedKey = secretKey ? secretKey : "developmentKey";

const main = async () => {
  await createConnection({
    type: 'postgres',
    database: dbName,
    username: pgUser,
    password: pgPass,
    logging: true,
    synchronize: true,
    entities: [Post, User]
  })


  const app = Express();
  const RedisStore = connectRedis(session)
  const redis = new Redis()
  app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
  }))
  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({ client: redis, disableTouch: true }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, //10 year cookie
        httpOnly: true,
        sameSite: 'lax', //csrf
        secure: __prod__ //cookie only works in https
      },
      secret: parsedKey,
      resave: false,
      saveUninitialized: false
    }))

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver, UserResolver],
      validate: false
    }),
    context: ({ req, res }) => ({ req, res, redis })
  })

  apolloServer.applyMiddleware({ app, cors: false })

  app.listen(4000, () => {
    console.log("Listening on Port 4000")
  })


}

main().catch(err => {
  console.error(err)
})