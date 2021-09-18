import { LoadCompanyByIdRepository } from '@/domain/contracts/repos'

type Params = { companyId: string }
type Result = undefined | { companyName: string, id: string }

export type ReadCompany = (params: Params) => Promise<Result>
type Setup = (companyRepo: LoadCompanyByIdRepository) => ReadCompany

export const setupReadCompany: Setup = (companyRepo) => {
  return async ({ companyId }) => {
    const company = await companyRepo.loadById({ companyId })

    if (company) return { companyName: company.name, id: company.id }
  }
}
