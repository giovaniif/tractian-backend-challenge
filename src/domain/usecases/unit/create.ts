import { CompanyNotFoundError } from '@/domain/errors'
import { CreateUnitRepository, LoadCompanyByIdRepository } from '@/domain/contracts/repos'

type Params = { companyId: string, name: string }
type Result = { name: string } | CompanyNotFoundError

export type CreateUnit = (params: Params) => Promise<Result>
type Setup = (companyRepo: LoadCompanyByIdRepository, unitRepo: CreateUnitRepository) => CreateUnit

export const setupCreateUnit: Setup = (companyRepo, unitRepo) => {
  return async ({ companyId, name }) => {
    const companyExists = await companyRepo.loadById({ companyId })
    if (!companyExists) return new CompanyNotFoundError()
    
    const unit = await unitRepo.create({ name, companyId })

    return { name: unit.name }
  }
}