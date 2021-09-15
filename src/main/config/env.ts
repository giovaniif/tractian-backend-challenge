import 'dotenv/config'

export const env = {
  port: process.env.PORT ?? 8080,
  mongoConnectUrl: process.env.MONGO_CONNECT_URL ?? ''
}