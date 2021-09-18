import { LoadCompanyByIdRepository, DeleteCompanyRepository } from '@/domain/contracts/repos'

type Params = { companyId: string }
type Result = { id: string, companyName: string } | undefined

export type DeleteCompany = (params: Params) => Promise<Result>
type Setup = (companyRepo: LoadCompanyByIdRepository & DeleteCompanyRepository) => DeleteCompany

export const setupDeleteCompany: Setup = (companyRepo) => {
  return async ({ companyId }) => {
    const companyExists = await companyRepo.loadById({ companyId })

    if (!companyExists) {
      return undefined
    }
    
    await companyRepo.delete({ companyId })
    return { id: companyExists.id, companyName: companyExists.name }
  }
}
