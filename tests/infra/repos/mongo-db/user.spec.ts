import { getConnection, getMongoRepository, MongoRepository } from 'typeorm'
import { MongoMemoryServer } from 'mongodb-memory-server'

import { MongoDBCompanyRepository } from '@/infra/repos/mongo-db'
import { MongoCompany } from '@/infra/entities/mongo-db'
import { makeFakeDb } from '@/tests/infra/mocks'

describe('Company Repository', () => {
  let repo: MongoRepository<MongoCompany>
  let sut: MongoDBCompanyRepository
  let mongo: MongoMemoryServer

  beforeAll(async () => {
    mongo = await makeFakeDb([MongoCompany])
    repo = getMongoRepository(MongoCompany)
  })

  beforeEach(async () => {
    await getConnection().getMongoRepository(MongoCompany).deleteMany({})
    sut = new MongoDBCompanyRepository()
  })

  afterAll(async () => {
    await getConnection().close()
    await mongo.stop()
  })

  describe('load by id', () => {
    it('should load company by id', async () => {
      const company = repo.create({ name: 'any_name', units: [], users: [] })
      await repo.save(company)

      const response = await sut.loadById({ companyId: company._id.toString() })

      expect(response).toEqual({ name: company.name, id: company._id.toString() })
    })

    it('should return undefined if company does not exists', async () => {
      const response = await sut.loadById({ companyId: 'a1425fcfcb3d856b5f7e49d9' })

      expect(response).toBeUndefined()
    })
  })
})
