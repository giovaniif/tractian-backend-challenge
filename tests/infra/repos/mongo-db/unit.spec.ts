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

  describe('load by id', () => {
    it('should return undefined if unit does not exist', async () => {
      const unit = await sut.loadById({ unitId: 'a1425fcfcb3d856b5f7e49d9' })

      expect(unit).toBeUndefined()
    })

    it('should return unit if it exists', async () => {
      const unit = repo.create({ companyId: 'any_id', name: 'any_name' })
      await repo.save(unit)

      const result = await sut.loadById({ unitId: unit._id.toString() })

      expect(result?.name).toEqual('any_name')
    })
  })

  describe('delete', () => {
    it('should delete', async () => {
      const { id } = await sut.create({ name: 'any_name', companyId: 'any_id' })
      
      await sut.delete({ unitId: id })
      const find = await sut.loadById({ unitId: id })

      expect(find).toBeUndefined()
    })
  })

  describe('load all', () => {
    it('should return all existing units', async () => {
      await sut.create({ companyId: 'any_id', name: 'any_name' })

      const units = await sut.loadAll()

      expect(units.length).toBe(1)
    })
  })

  describe('load by company', () => {
    it('should return all units from given company', async () => {
      await sut.create({ companyId: 'any_id', name: 'any_name' })

      const units = await sut.loadByCompany({ companyId: 'any_id' })

      expect(units.length).toBe(1)
    })
  })
})
