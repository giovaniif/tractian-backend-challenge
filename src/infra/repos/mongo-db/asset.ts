import { getMongoRepository } from 'typeorm'

import { CreateAssetRepository, LoadAssetsByUnitRepository } from '@/domain/contracts/repos'
import { MongoAsset } from '@/infra/entities/mongo-db'

type CreateParams = CreateAssetRepository.Params
type CreateResult = CreateAssetRepository.Result

type LoadByUnitResult = LoadAssetsByUnitRepository.Result
type LoadByUnitParams = LoadAssetsByUnitRepository.Params

export class MongoDBAssetRepository implements CreateAssetRepository, LoadAssetsByUnitRepository {
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
}