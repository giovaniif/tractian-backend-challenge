import { getMongoRepository } from 'typeorm'

import { CreateUnitRepository } from '@/domain/contracts/repos'
import { MongoUnit } from '@/infra/entities/mongo-db'

type CreateParams = CreateUnitRepository.Params
type CreateResult = CreateUnitRepository.Result

export class MongoDBUnitRepository implements CreateUnitRepository {
  async create({ companyId, name }: CreateParams): Promise<CreateResult> {
    const repo = getMongoRepository(MongoUnit)

    const unit = repo.create({ companyId, name })
    await repo.save(unit)

    return { name: unit.name, id: unit._id.toString() }
  }
}