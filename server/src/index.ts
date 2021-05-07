import 'reflect-metadata'
import { MikroORM } from "@mikro-orm/core";
import Express from "express"
import session from "express-session"
import Redis from 'redis';
import { ApolloServer } from 'apollo-server-express'
import { config } from "dotenv"
import connectRedis from 'connect-redis'

import microConfig from "./mikro-orm.config";
import { buildSchema } from "type-graphql"
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/post";
import { UserResolver } from './resolvers/user';
import { __prod__ } from './constants';
import { MyContext } from './types';
import cors from "cors"

config()
const { secretKey } = process.env
const parsedKey = secretKey ? secretKey : "developmentKey";

const main = async () => {

  const orm = await MikroORM.init(microConfig);
  const migrator = await orm.getMigrator();
  migrator.up()

  const app = Express();
  const RedisStore = connectRedis(session)
  const redisClient = Redis.createClient()
  app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
  }))
  app.use(
    session({
      name: 'qid',
      store: new RedisStore({ client: redisClient, disableTouch: true }),
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
    context: ({ req, res }): MyContext => ({ em: orm.em, req, res })
  })

  apolloServer.applyMiddleware({ app, cors: false })

  app.listen(4000, () => {
    console.log("Listening on Port 4000")
  })


}

main().catch(err => {
  console.error(err)
})