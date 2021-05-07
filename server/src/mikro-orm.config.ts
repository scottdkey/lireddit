import { __prod__ } from "./constants";
import { Post } from "./entities/Post";
import { MikroORM } from "@mikro-orm/core";
import path from "path"
import dotenv from "dotenv"
import { User } from "./entities/User";
dotenv.config()

const { pgUser, pgPass, dbName, pgHost } = process.env
export default {
  migrations: {
    path: path.join(__dirname, "./migrations"),
    pattern: /^[\w-]d+\.[tj]s$/,
  },
  entities: [Post, User],
  dbName: dbName,
  type: 'postgresql',
  debug: !__prod__,
  user: pgUser,
  password: pgPass,
  host: pgHost

} as Parameters<typeof MikroORM.init>[0];