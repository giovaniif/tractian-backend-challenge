import { Connection, createConnection, Entity, Column, ObjectID, ObjectIdColumn, getRepository } from 'typeorm'
import { MongoMemoryServer } from 'mongodb-memory-server'

import { CompanyRepository } from '@/data/contracts/repos'

class MongoDBCompanyRepository  {
  async load (params: CompanyRepository.Params): Promise<CompanyRepository.LoadResult> {
    const repo = getRepository(MongoCompany)

    const company = await repo.findOne({ where: { name: params.companyName } })
    if (!company) return undefined

    return company
  }
}

@Entity()
class MongoCompany {
  @ObjectIdColumn()
  id!: ObjectID

  @Column()
  name!: string

  @Column({ type: 'array' })
  users!: object[]

  @Column({ type: 'array' })
  units!: object[]
}

describe('Company Repository', () => {
  describe('load', () => {
    let mongo: MongoMemoryServer
    let connection: Connection

    beforeAll(async () => {
      mongo = await MongoMemoryServer.create()
      const mongoUri = mongo.getUri()
      connection = await createConnection({
        type: "mongodb",
        url: mongoUri,
        entities: [MongoCompany],
        useUnifiedTopology: true,
      })
      await connection.synchronize()
    })

    it('should return undefined if company does not exists', async () => {
      const sut = new MongoDBCompanyRepository()

      const response = await sut.load({ companyName: 'invalid_name' })

      expect(response).toBeUndefined()
    })

    it('should return the company if company exists', async () => {
      const sut = new MongoDBCompanyRepository()
      const repo = getRepository(MongoCompany)
      const company = repo.create({ name: 'any_name', units: [], users: [] })
      await repo.save(company)

      const response = await sut.load({ companyName: 'any_name' })

      expect(response).toEqual(company)
    })
  })
})

