import { CreateUser, setupCreateUser } from '@/domain/usecases/user'
import { makeMongoDBUserRepo, makeMongoDBCompanyRepo } from '@/main/factories/repos'

export const makeCreateUserUseCase = (): CreateUser => setupCreateUser(makeMongoDBCompanyRepo(), makeMongoDBUserRepo())
