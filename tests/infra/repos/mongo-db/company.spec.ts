import { Connection, createConnection, Entity, Column, ObjectID, ObjectIdColumn, getConnection, getMongoRepository, MongoRepository } from 'typeorm'
import { MongoMemoryServer } from 'mongodb-memory-server'

import { CompanyRepository } from '@/data/contracts/repos'

class MongoDBCompanyRepository  {
  async load (params: CompanyRepository.Params): Promise<CompanyRepository.LoadResult> {
    const repo = getMongoRepository(MongoCompany)

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

const makeFakeDb = async (entities?: any[]): Promise<MongoMemoryServer> => {
  const mongo = await MongoMemoryServer.create()
  const connection = await createConnection({
    type: "mongodb",
    url: mongo.getUri(),
    entities: entities ?? ['src/infra/repos/mongo-db/entities/index.ts'],
    useUnifiedTopology: true,
  })
  await connection.synchronize()
  return mongo
}

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

