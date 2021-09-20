import { getConnection, getMongoRepository, MongoRepository } from 'typeorm'
import { MongoMemoryServer } from 'mongodb-memory-server'

import { MongoDBAssetRepository } from '@/infra/repos/mongo-db'
import { MongoAsset } from '@/infra/entities/mongo-db'
import { makeFakeDb, makeParams } from '@/tests/infra/mocks'
import { ObjectID } from 'bson'

describe('Asset Repository', () => {
  let repo: MongoRepository<MongoAsset>
  let sut: MongoDBAssetRepository
  let mongo: MongoMemoryServer
  const params = makeParams()

  beforeAll(async () => {
    mongo = await makeFakeDb([MongoAsset])
    repo = getMongoRepository(MongoAsset)
  })

  beforeEach(async () => {
    await getConnection().getMongoRepository(MongoAsset).deleteMany({})
    sut = new MongoDBAssetRepository()
  })

  afterAll(async () => {
    await getConnection().close()
    await mongo.stop()
  })

  describe('create', () => {
    it('should create asset', async () => {
      const { name } = await sut.create({ ...params, status: 'ALERTING' })

      expect(name).toBe('any_name')
    })
  })

  describe('loadByUnit', () => {
    it('should return an array of assets', async () => {
      await sut.create(params)

      const result = await sut.loadByUnit({ unitId: params.unitId })
      
      expect(result.length).toBe(1)
    })
  })

  describe('delete', () => {
    it('should delete asset', async () => {
      const { id } = await sut.create(params)
      
      await sut.delete({ assetId: id })
      const find = await repo.find({ where: { _id: new ObjectID(id) } })

      expect(find.length).toBe(0)
    })
  })

  describe('load by id', () => {
    it('should return undefined if asset does not exist', async () => {
      const asset = await sut.loadById({ assetId: 'a1425fcfcb3d856b5f7e49d9' })

      expect(asset).toBeUndefined()
    })

    it('should return asset if it exists', async () => {
      const asset = repo.create(params)
      await repo.save(asset)

      const result = await sut.loadById({ assetId: asset._id.toString() })

      expect(result?.name).toEqual('any_name')
    })
  })

  describe('update', () => {
    it('should update the data', async () => {
      const oldAsset = await sut.create(params)

      const newAsset = await sut.update({ id: oldAsset.id, data: { name: 'new_name' } })

      expect(newAsset.name).toBe('new_name')
      expect(newAsset.description).toBe(oldAsset.description)
    })
  })
})
