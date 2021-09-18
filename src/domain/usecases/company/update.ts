import { LoadCompanyByIdRepository, LoadCompanyRepository, UpdateCompanyRepository } from '@/domain/contracts/repos'
import { CompanyNotFoundError, InvalidNameError, NameAlreadyInUseError } from '@/domain/errors'

type Params = { companyName: string, companyId: string }
type Result = { companyName: string, id: string } | NameAlreadyInUseError | InvalidNameError

export type UpdateCompany = (params: Params) => Promise<Result>
type Setup = (companyRepo: LoadCompanyByIdRepository & LoadCompanyRepository & UpdateCompanyRepository) => UpdateCompany

export const setupUpdateCompany: Setup = (companyRepo) => {
  return async ({ companyId, companyName }) => {
    if (companyName.length < 2) return new InvalidNameError()

    const companyExists = await companyRepo.loadById({ companyId })
    if (!companyExists) return new CompanyNotFoundError()

    const nameAlreadyInUse = await companyRepo.load({ companyName })
    if (nameAlreadyInUse) return new NameAlreadyInUseError()

    const company = await companyRepo.updateName({ companyId, companyName })
    return {
      companyName: company.name,
      id: company.id
    }
  }
}
