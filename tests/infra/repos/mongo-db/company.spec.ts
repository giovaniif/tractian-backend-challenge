import { getConnection, getMongoRepository, MongoRepository } from 'typeorm'
import { MongoMemoryServer } from 'mongodb-memory-server'

import { MongoDBCompanyRepository } from '@/infra/repos/mongo-db'
import { MongoCompany } from '@/infra/entities/mongo-db'
import { makeFakeDb } from '@/tests/infra/mocks'

describe('Company Repository', () => {
  describe('load', () => {
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

    it('should return the company if it exists', async () => {
      const company = repo.create({ name: 'any_name', units: [], users: [] })
      await repo.save(company)

      const response = await sut.load({ companyName: 'any_name' })

      expect(response).toEqual(company)
    })

    it('should return undefined if company does not exists', async () => {
      const response = await sut.load({ companyName: 'any_name' })

      expect(response).toBeUndefined()
    })
  })
})

