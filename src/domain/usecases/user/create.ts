import { LoadCompanyByIdRepository, LoadUserByEmailRepository } from '@/domain/contracts/repos'
import { CompanyNotFoundError } from '@/domain/errors'

type Result = CompanyNotFoundError | undefined
type Params = { name: string, email: string, companyId: string }

export type CreateUser = (params: Params) => Promise<Result>
type Setup = (companyRepo: LoadCompanyByIdRepository, userRepo: LoadUserByEmailRepository) => CreateUser

export const setupCreateUser: Setup = (companyRepo, userRepo) => {
  return async ({ companyId, email }) => {
    const company = await companyRepo.loadById({ companyId })
    if (!company) return new CompanyNotFoundError()

    await userRepo.loadByEmail({ email })
  }
}
