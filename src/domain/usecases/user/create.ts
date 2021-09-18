import { LoadCompanyByIdRepository } from '@/domain/contracts/repos'

type Result = void
type Params = { name: string, email: string, companyId: string }

export type CreateUser = (params: Params) => Promise<Result>
type Setup = (companyRepo: LoadCompanyByIdRepository) => CreateUser

export const setupCreateUser: Setup = (companyRepo) => {
  return async ({ companyId }) => {
    await companyRepo.loadById({ companyId })
  }
}
