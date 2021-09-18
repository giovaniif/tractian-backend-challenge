import { LoadCompanyRepository } from '@/domain/contracts/repos'

type Result = { companyName: string, id: string }[]

export type ListCompanies = () => Promise<Result>
type Setup = (companyRepo: LoadCompanyRepository) => ListCompanies

export const setupListCompanies: Setup = (companyRepo) => {
  return async () => {
    const companies = await companyRepo.loadAll()

    return companies.map(c => ({
      companyName: c.name,
      id: c.id.toString(),
    }))
  }
} 
