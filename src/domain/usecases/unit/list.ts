import { LoadUnitRepository } from '@/domain/contracts/repos'

type Result = Array<{ name: string, id: string }>

export type ListUnits = () => Promise<Result>
type Setup = (unitRepo: LoadUnitRepository) => ListUnits

export const setupListUnits: Setup = (unitRepo) => {
  return async () => {
    const units = await unitRepo.loadAll()

    return units.map(c => ({
      name: c.name,
      id: c.id.toString(),
    }))
  }
} 
