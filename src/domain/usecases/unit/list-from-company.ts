import { LoadUnitRepository } from '@/domain/contracts/repos'

type Params = { companyId: string }
type Result = Array<{ name: string, id: string }>

export type ListUnitsFromCompany = (params: Params) => Promise<Result>
type Setup = (unitRepo: LoadUnitRepository) => ListUnitsFromCompany

export const setupListUnitsFromCompany: Setup = (unitRepo) => {
  return async ({ companyId }) => {
    const units = await unitRepo.loadByCompany({ companyId })

    return units.map(c => ({
      name: c.name,
      id: c.id.toString(),
    }))
  }
} 
