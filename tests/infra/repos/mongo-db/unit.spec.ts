import MongoMemoryServer from 'mongodb-memory-server-core'
import { getConnection, getMongoRepository, MongoRepository } from 'typeorm'

import { MongoDBUnitRepository } from '@/infra/repos/mongo-db'
import { makeFakeDb } from '@/tests/infra/mocks'
import { MongoUnit } from '@/infra/entities/mongo-db'

describe('MongoDB Unit Repository', () => {
  let repo: MongoRepository<MongoUnit>
  let sut: MongoDBUnitRepository
  let mongo: MongoMemoryServer

  beforeAll(async () => {
    mongo = await makeFakeDb([MongoUnit])
    repo = getMongoRepository(MongoUnit)
  })

  beforeEach(async () => {
    await getConnection().getMongoRepository(MongoUnit).deleteMany({})
    sut = new MongoDBUnitRepository()
  })

  afterAll(async () => {
    await getConnection().close()
    await mongo.stop()
  })
  
  describe('create', () => {
    it('should create user', async () => {
      const unit = await sut.create({ companyId: 'any_id', name: 'any_name' })

      expect(unit.name).toBe('any_name')
    })
  })
})
