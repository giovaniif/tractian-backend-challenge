import { LoadUnitRepository } from '@/domain/contracts/repos'

type Result = Array<{ name: string, id: string }>

export type ListUnits = () => Promise<Result>
type Setup = (unitRepo: LoadUnitRepository) => ListUnits

export const setupListUnits: Setup = (unitRepo) => {
  return async () => {
    return {} as any
  }
} 
