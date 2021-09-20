import { getMongoRepository } from 'typeorm'

import { CreateAssetRepository } from '@/domain/contracts/repos'
import { MongoAsset } from '@/infra/entities/mongo-db'

type CreateParams = CreateAssetRepository.Params
type CreateResult = CreateAssetRepository.Result

export class MongoDBAssetRepository implements CreateAssetRepository {
  async create (params: CreateParams): Promise<CreateResult> {
    const repo = getMongoRepository(MongoAsset)

    const asset = repo.create(params)
    await repo.save(asset)

    return { ...asset, id: asset._id.toString(), unitId: asset.unitId.toString() }
  }
}