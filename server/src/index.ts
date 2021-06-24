import {cors} from "./middleware/cors";
import { config } from "dotenv";
import Express from "express";
import 'reflect-metadata';
import { createConnection } from "typeorm";
import { Post } from "./entities/Post";
import { User } from "./entities/User";
import { apollo } from './middleware/apolloServer';
import { session } from "./middleware/session";
import { PORT } from "./constants";
import path from "path"

config()

const { pgUser, pgPass, dbName } = process.env
const main = async () => {
  const conn = await createConnection({
    type: 'postgres',
    database: dbName,
    username: pgUser,
    password: pgPass,
    logging: true,
    synchronize: true,
    migrations: [path.join(__dirname, './migrations/*')],
    entities: [Post, User]
  })
  await conn.runMigrations()

  const app = Express();
  app.use(cors)
  app.use(session)
  await apollo(app)
  
  app.listen(PORT, () => {
    console.log(`Listening on Port ${PORT}`)
  })


}

main().catch(err => {
  console.error(err)
})