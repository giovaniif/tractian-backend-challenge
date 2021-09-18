import { CreateCompanyRepository, LoadCompanyRepository } from '@/domain/contracts/repos'
import { InvalidNameError, NameAlreadyInUseError } from '@/domain/errors'

type Result = { companyName: string, id: string } | NameAlreadyInUseError | InvalidNameError
type Params = { companyName: string }

export type CreateCompany = (params: Params) => Promise<Result>
type Setup = (companyRepo: CreateCompanyRepository & LoadCompanyRepository) => CreateCompany

export const setupCreateCompany: Setup = (companyRepo) => {
  return async params => {
    if (params.companyName === undefined || params.companyName.length < 2) return new InvalidNameError()
    
    const companyExists = await companyRepo.load(params)
    
    if (companyExists) return new NameAlreadyInUseError()
    
    const company = await companyRepo.create(params)
    return { id: company.id, companyName: company.name }
  }
}
