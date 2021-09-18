import { getMongoRepository } from 'typeorm'

import { CreateUserRepository, LoadUserByEmailRepository } from '@/domain/contracts/repos'
import { MongoUser } from '@/infra/entities/mongo-db/user'

type CreateParams = CreateUserRepository.Params
type CreateResult = CreateUserRepository.Result

type LoadByEmailParams = LoadUserByEmailRepository.Params
type LoadByEmailResult = LoadUserByEmailRepository.Result

export class MongoDBUserRepository implements CreateUserRepository, LoadUserByEmailRepository {
  async create({ email, name, companyId }: CreateParams): Promise<CreateResult> {
    const repo = getMongoRepository(MongoUser)

    const user = repo.create({ name, email, companyId })
    await repo.save(user)

    return { name: user.name, email: user.email, id: user._id.toString() }
  }

  async loadByEmail({ email }: LoadByEmailParams): Promise<LoadByEmailResult> {
    const repo = getMongoRepository(MongoUser)

    const user = await repo.findOne({ where: { email } })
    
    if (user) {
      return { email: user.email, name: user.name, id: user._id.toString() }
    }
  }
}