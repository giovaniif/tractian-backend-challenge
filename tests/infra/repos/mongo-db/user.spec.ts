import MongoMemoryServer from 'mongodb-memory-server-core'
import { getConnection, getMongoRepository, MongoRepository } from 'typeorm'

import { MongoUser } from '@/infra/entities/mongo-db/user'
import { MongoDBUserRepository } from '@/infra/repos/mongo-db'
import { makeFakeDb } from '@/tests/infra/mocks'

describe('MongoDB User Repo', () => {
  let repo: MongoRepository<MongoUser>
  let sut: MongoDBUserRepository
  let mongo: MongoMemoryServer

  beforeAll(async () => {
    mongo = await makeFakeDb([MongoUser])
    repo = getMongoRepository(MongoUser)
  })

  beforeEach(async () => {
    await getConnection().getMongoRepository(MongoUser).deleteMany({})
    sut = new MongoDBUserRepository()
  })

  afterAll(async () => {
    await getConnection().close()
    await mongo.stop()
  })
  
  describe('create', () => {
    it('should create user', async () => {
      const user = await sut.create({ companyId: 'any_id', email: 'any_email', name: 'any_name' })

      expect(user.name).toBe('any_name')
      expect(user.email).toBe('any_email')
    })
  })

  describe('loadByEmail', () => {
    it('should return undefined if user does not exist', async () => {
      const result = await sut.loadByEmail({ email: 'not_existing_email' })

      expect(result).toBeUndefined()
    })

    it('should return user if it exists', async () => {
      await sut.create({ companyId: 'any_id', email: 'any_email', name: 'any_name' })

      const result = await sut.loadByEmail({ email: 'any_email' })

      expect(result?.email).toBe('any_email')
      expect(result?.name).toBe('any_name')
    })
  })
})