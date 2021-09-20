import { LoadAssetsByUnitRepository, LoadUnitByIdRepository } from '@/domain/contracts/repos'
import { UnitNotFoundError } from '@/domain/errors'

type Params = { unitId: string }
type Result = Array<{
  id: string,
  name: string, 
  imageUrl: string, 
  description: string, 
  model: string, 
  owner: string, 
  status: string,
  healthLevel: string,
  unitId: string 
}> | UnitNotFoundError

export type LoadAssetsByUnit = (params: Params) => Promise<Result>
type Setup = (unitRepo: LoadUnitByIdRepository, assetRepo: LoadAssetsByUnitRepository) => LoadAssetsByUnit

export const setupLoadAssetsByUnit: Setup = (unitRepo, assetRepo) => {
  return async ({ unitId }) => {
    const unitExists = await unitRepo.loadById({ unitId })
    if (!unitExists) return new UnitNotFoundError()
    
    return assetRepo.loadByUnit({ unitId })
  }
} 
