import { getMongoRepository } from 'typeorm'
import { ObjectID } from 'bson'

import { CreateUnitRepository, LoadUnitByIdRepository, DeleteUnitRepository, LoadUnitRepository } from '@/domain/contracts/repos'
import { MongoUnit } from '@/infra/entities/mongo-db'

type CreateParams = CreateUnitRepository.Params
type CreateResult = CreateUnitRepository.Result

type LoadByIdParams = LoadUnitByIdRepository.Params
type LoadByIdResult = LoadUnitByIdRepository.Result

type DeleteParams = DeleteUnitRepository.Params
type DeleteResult = DeleteUnitRepository.Result

type LoadAllResult = LoadUnitRepository.Result

export class MongoDBUnitRepository implements CreateUnitRepository, LoadUnitByIdRepository, DeleteUnitRepository, LoadUnitRepository {
  async create({ companyId, name }: CreateParams): Promise<CreateResult> {
    const repo = getMongoRepository(MongoUnit)

    const unit = repo.create({ companyId, name })
    await repo.save(unit)

    return { name: unit.name, id: unit._id.toString() }
  }

  async loadById({ unitId }: LoadByIdParams): Promise<LoadByIdResult> {
    const repo = getMongoRepository(MongoUnit)

    const unit = await repo.findOne({ where: { _id: new ObjectID(unitId) } })
    if (!unit) return undefined

    return { id: unit._id.toString(), name: unit.name }
  }

  async delete({ unitId }: DeleteParams): Promise<DeleteResult> {
    const repo = getMongoRepository(MongoUnit)
    const unitObjectId = new ObjectID(unitId)

    await repo.deleteOne({ _id: unitObjectId })
  }

  async loadAll(): Promise<LoadAllResult> {
    const repo = getMongoRepository(MongoUnit)

    const units = await repo.find()

    return units.map(c => ({
      name: c.name,
      id: c._id.toString()
    }))
  }
}