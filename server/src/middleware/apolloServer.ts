import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "../resolvers/hello";
import { PostResolver } from "../resolvers/post";
import { UserResolver } from "../resolvers/user";
import { redis } from "./session"



export const apollo = async (app: any) => {
  const apollo = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver, UserResolver],
      validate: false
    }),
    context: ({ req, res }) => ({ req, res, redis })

  })
  apollo.applyMiddleware({ app, cors: false })
}