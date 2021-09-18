import { ListUsersFromCompanyController } from '@/application/controllers'
import { makeListFromCompanyUseCase } from '@/main/factories/usecases/user'

export const makeListUsersFromCompanyController = (): ListUsersFromCompanyController => new ListUsersFromCompanyController(makeListFromCompanyUseCase())
