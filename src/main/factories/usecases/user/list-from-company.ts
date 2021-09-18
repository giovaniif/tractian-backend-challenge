import { ListUsers, setupListUsers } from '@/domain/usecases/user'
import { makeMongoDBUserRepo } from '@/main/factories/repos'

export const makeListFromCompanyUseCase = (): ListUsers => setupListUsers(makeMongoDBUserRepo())