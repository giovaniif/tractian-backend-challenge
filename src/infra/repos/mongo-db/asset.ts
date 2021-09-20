import { getMongoRepository } from 'typeorm'

import { CreateAssetRepository, LoadAssetsByUnitRepository, DeleteAssetRepository } from '@/domain/contracts/repos'
import { MongoAsset } from '@/infra/entities/mongo-db'
import { ObjectID } from 'bson'

type CreateParams = CreateAssetRepository.Params
type CreateResult = CreateAssetRepository.Result

type LoadByUnitResult = LoadAssetsByUnitRepository.Result
type LoadByUnitParams = LoadAssetsByUnitRepository.Params

type DeleteParams = DeleteAssetRepository.Params
type DeleteResult = DeleteAssetRepository.Result

export class MongoDBAssetRepository implements CreateAssetRepository, LoadAssetsByUnitRepository, DeleteAssetRepository {
  async create (params: CreateParams): Promise<CreateResult> {
    const repo = getMongoRepository(MongoAsset)

    const asset = repo.create(params)
    await repo.save(asset)

    return { ...asset, id: asset._id.toString(), unitId: asset.unitId.toString() }
  }

  async loadByUnit ({ unitId }: LoadByUnitParams): Promise<LoadByUnitResult> {
    const repo = getMongoRepository(MongoAsset)

    const assets = await repo.find({ where: { unitId } })

    return assets.map(asset => ({
      ...asset,
      unitId: asset.unitId.toString(),
      id: asset._id.toString()
    }))
  }

  async delete ({ assetId }: DeleteParams): Promise<DeleteResult> {
    const repo = getMongoRepository(MongoAsset)
    const assetObjectId = new ObjectID(assetId)

    await repo.deleteOne({ _id: assetObjectId })
  }
}