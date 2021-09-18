import { getMongoRepository } from 'typeorm'

import { CreateUserRepository } from '@/domain/contracts/repos'
import { MongoUser } from '@/infra/entities/mongo-db/user'

type CreateParams = CreateUserRepository.Params
type CreateResult = CreateUserRepository.Result

export class MongoDBUserRepository implements CreateUserRepository {
  async create({ email, name, companyId }: CreateParams): Promise<CreateResult> {
    const repo = getMongoRepository(MongoUser)

    const user = repo.create({ name, email, companyId })
    await repo.save(user)

    return { name: user.name, email: user.email, id: user._id.toString() }
  }
}