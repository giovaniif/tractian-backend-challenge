import { CreateUserRepository, LoadCompanyByIdRepository, LoadUserByEmailRepository } from '@/domain/contracts/repos'
import { CompanyNotFoundError, EmailAlreadyInUseError } from '@/domain/errors'

type Result = CompanyNotFoundError | EmailAlreadyInUseError | undefined
type Params = { name: string, email: string, companyId: string }

export type CreateUser = (params: Params) => Promise<Result>
type Setup = (companyRepo: LoadCompanyByIdRepository, userRepo: LoadUserByEmailRepository & CreateUserRepository) => CreateUser

export const setupCreateUser: Setup = (companyRepo, userRepo) => {
  return async ({ companyId, email, name }) => {
    const company = await companyRepo.loadById({ companyId })
    if (!company) return new CompanyNotFoundError()

    const user = await userRepo.loadByEmail({ email })
    if (user) return new EmailAlreadyInUseError()

    await userRepo.create({ companyId, email, name })
  }
}
