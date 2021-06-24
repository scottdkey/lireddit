import { cors } from "./cors";
import { config } from "dotenv";
import Express from "express";
import 'reflect-metadata';
import { session } from "./session";
import { PORT } from "./constants";
import { redis } from "./session"
import { db } from "./db";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/post";
import { UserResolver } from "./resolvers/user";

config()


const main = async () => {
  await db()
  const app = Express();
  app.use(cors)
  app.use(session)
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