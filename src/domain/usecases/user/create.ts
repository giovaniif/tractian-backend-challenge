import { CreateUserRepository, LoadCompanyByIdRepository, LoadUserByEmailRepository } from '@/domain/contracts/repos'
import { CompanyNotFoundError, EmailAlreadyInUseError } from '@/domain/errors'

type Result = CompanyNotFoundError | EmailAlreadyInUseError | { name: string, email: string, id: string }
type Params = { name: string, email: string, companyId: string }

export type CreateUser = (params: Params) => Promise<Result>
type Setup = (companyRepo: LoadCompanyByIdRepository, userRepo: LoadUserByEmailRepository & CreateUserRepository) => CreateUser

export const setupCreateUser: Setup = (companyRepo, userRepo) => {
  return async ({ companyId, email, name }) => {
    const company = await companyRepo.loadById({ companyId })
    if (!company) return new CompanyNotFoundError()

    const userExists = await userRepo.loadByEmail({ email, companyId })
    if (userExists) return new EmailAlreadyInUseError()

    return userRepo.create({ companyId, email, name })
  }
}
