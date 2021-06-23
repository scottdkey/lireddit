export const __prod__ = process.env.NODE_ENV === 'production'
export const COOKIE_NAME = 'qid'
export const FORGET_PASSWORD_PREFIX = 'forget-password:'
export const PORT: String = process.env.PORT ? process.env.PORT : "4000"
export const SECRET_KEY = process.env.secretkey ? process.env.secretkey : "developmentKey";