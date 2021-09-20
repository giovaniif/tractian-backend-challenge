import { getMongoRepository } from 'typeorm'
import { ObjectID } from 'bson'

import { CreateAssetRepository, LoadAssetsByUnitRepository, DeleteAssetRepository, LoadAssetByIdRepository, UpdateAssetDataRepository } from '@/domain/contracts/repos'
import { MongoAsset } from '@/infra/entities/mongo-db'

type CreateParams = CreateAssetRepository.Params
type CreateResult = CreateAssetRepository.Result

type LoadByUnitResult = LoadAssetsByUnitRepository.Result
type LoadByUnitParams = LoadAssetsByUnitRepository.Params

type DeleteParams = DeleteAssetRepository.Params
type DeleteResult = DeleteAssetRepository.Result

type LoadByIdParams = LoadAssetByIdRepository.Params
type LoadByIdResult = LoadAssetByIdRepository.Result

type UpdateParams = UpdateAssetDataRepository.Params
type UpdateResult = UpdateAssetDataRepository.Result

export class MongoDBAssetRepository implements CreateAssetRepository, LoadAssetsByUnitRepository, DeleteAssetRepository, LoadAssetByIdRepository, UpdateAssetDataRepository {
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

  async loadById ({ assetId }: LoadByIdParams): Promise<LoadByIdResult> {
    const repo = getMongoRepository(MongoAsset)

    const asset = await repo.findOne({ where: { _id: new ObjectID(assetId) } })
    if (!asset) return undefined

    return { ...asset, id: asset._id.toString(), unitId: asset.unitId.toString() }
  }

  async update ({ id, data }: UpdateParams): Promise<UpdateResult> {
    const repo = getMongoRepository(MongoAsset)
    const assetObjectId = new ObjectID(id)

    const { value: newAsset } = await repo.findOneAndUpdate(
      { _id: assetObjectId }, 
      { $set: { ...data } }, 
      { returnDocument: 'after' } as any
    )

    return {
      id: newAsset._id.toString(),
      name: newAsset.name,
      description: newAsset.description,
      healthLevel: newAsset.healthLevel,
      imageUrl: newAsset.imageUrl,
      model: newAsset.model,
      owner: newAsset.owner,
      status: newAsset.status,
      unitId: newAsset.unitId.toString()
    }
  }
}