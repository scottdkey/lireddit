import { createConnection } from "typeorm";
import { Post } from "./entities/Post";
import { User } from "./entities/User";

export const db = async () => {
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
}