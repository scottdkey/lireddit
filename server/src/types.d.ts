import { Connection, EntityManager, IDatabaseDriver } from "@mikro-orm/core";
import { Request, Response } from "express";

export type MyContext = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  em: EntityManager<any> & EntityManager<IDatabaseDriver<Connection>>;
  req: Request;
  res: Response;
}

declare module "express-session" {
  interface Session {
    userId: string
  }
}