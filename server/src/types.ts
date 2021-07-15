import { Request, Response } from "express";
import { Session } from "express-session"
import { Redis } from "ioredis"

export type MyContext = {
  req: Request & { session: MySession };
  res: Response
  redis: Redis;
}

interface MySession extends Session {
  userId: string

}