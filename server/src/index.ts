
import { config } from "dotenv";
import Express from "express";
import 'reflect-metadata';
import { PORT } from "./constants";

import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/post";
import { UserResolver } from "./resolvers/user";
import cors from "cors"
import connectRedis from "connect-redis";
import session from "express-session";
import { COOKIE_NAME, __prod__, SECRET_KEY } from "./constants";
import Redis from 'ioredis';
import { createConnection } from "typeorm";
import { Post } from "./entities/Post";
import { User } from "./entities/User";

config()


const main = async () => {
  const { pgUser, pgPass, dbName } = process.env
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
  app.use(cors())
  const RedisStore = connectRedis(session)
  const redis = new Redis()
  app.use(session({
    name: COOKIE_NAME,
    store: new RedisStore({
      client: redis,
      disableTouch: true
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 365 * 10, //10 year cookie
      httpOnly: true,
      sameSite: 'lax', //csrf
      secure: __prod__ //cookie only works in https
    },
    secret: SECRET_KEY,
    resave: false,
    saveUninitialized: false
  }))

  const apollo = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver, UserResolver],
      validate: false
    }),
    context: ({ req, res }) => ({ req, res, redis })

  })
  apollo.applyMiddleware({ app, cors: false })
  app.listen(PORT, () => {
    console.log(`Listening on Port ${PORT}`)
  }).on("Error", (err) => {
    console.error("Error:", err)
  })


}

export default main()