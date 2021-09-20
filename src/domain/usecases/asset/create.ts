import { CreateAssetRepository, LoadUnitByIdRepository } from '@/domain/contracts/repos'
import { InvalidStatusError, UnitNotFoundError } from '@/domain/errors'

type Params = { 
  name: string, 
  imageUrl: string, 
  description: string, 
  model: string, 
  owner: string, 
  status: string,
  healthLevel: string,
  unitId: string 
}

type Result = {
  id: string,
  name: string, 
  imageUrl: string, 
  description: string, 
  model: string, 
  owner: string, 
  status: string,
  healthLevel: string,
  unitId: string 
} | UnitNotFoundError | InvalidStatusError

export type CreateAsset = (params: Params) => Promise<Result>
type Setup = (unitRepo: LoadUnitByIdRepository, assetRepo: CreateAssetRepository) => CreateAsset

export const setupCreateAsset: Setup = (unitRepo, assetRepo) => {
  return async params => {
    const result = await unitRepo.loadById({ unitId: params.unitId })
    if (!result) return new UnitNotFoundError()

    if (!['RUNNING', 'STOPPED', 'ALERTING'].includes(params.status)) return new InvalidStatusError()

    return assetRepo.create(params)
  }
}
