import { CreateUserRepository, LoadUserByEmailRepository } from '@/domain/contracts/repos'

type LoadByEmailParams = LoadUserByEmailRepository.Params
type LoadByEmailResult = LoadUserByEmailRepository.Result

type CreateParams = CreateUserRepository.Params
type CreateResult = CreateUserRepository.Result

export class MongoDBUserRepository implements CreateUserRepository, LoadUserByEmailRepository {
  async loadByEmail ({}: LoadByEmailParams): Promise<LoadByEmailResult> {
    return {} as any
  }

  async create ({}: CreateParams): Promise<CreateResult> {
    return {} as any
  }
   
}