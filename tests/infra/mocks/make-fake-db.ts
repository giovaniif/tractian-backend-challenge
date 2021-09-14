import { MongoMemoryServer } from 'mongodb-memory-server'
import { createConnection } from 'typeorm'

export const makeFakeDb = async (entities?: any[]): Promise<MongoMemoryServer> => {
  const mongo = await MongoMemoryServer.create()
  const connection = await createConnection({
    type: 'mongodb',
    url: mongo.getUri(),
    entities: entities ?? ['src/infra/entities/mongo-db/index.ts'],
    useUnifiedTopology: true,
  })
  await connection.synchronize()
  return mongo
}
