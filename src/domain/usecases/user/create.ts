import { LoadCompanyByIdRepository } from '@/domain/contracts/repos'
import { CompanyNotFoundError } from '@/domain/errors'

type Result = CompanyNotFoundError | undefined
type Params = { name: string, email: string, companyId: string }

export type CreateUser = (params: Params) => Promise<Result>
type Setup = (companyRepo: LoadCompanyByIdRepository) => CreateUser

export const setupCreateUser: Setup = (companyRepo) => {
  return async ({ companyId }) => {
    const company = await companyRepo.loadById({ companyId })

    if (!company) return new CompanyNotFoundError()
  }
}
