import { LoadAssetByIdRepository, UpdateAssetDataRepository } from '@/domain/contracts/repos'
import { AssetNotFoundError } from '@/domain/errors'

type Params = { 
  assetId: string,
  data: { 
    name?: string, 
    imageUrl?: string, 
    description?: string, 
    model?: string, 
    owner?: string, 
    status?: string,
    healthLevel?: string
  } 
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
} | AssetNotFoundError

export type UpdateAssetData = (params: Params) => Promise<Result>
type Setup = (assetRepo: UpdateAssetDataRepository & LoadAssetByIdRepository) => UpdateAssetData

export const setupUpdateAssetData: Setup = (assetRepo) => {
  return async ({ assetId, ...updateData }) => {
    const assetExists = await assetRepo.loadById({ assetId })
    if (!assetExists) return new AssetNotFoundError()
    
    return assetRepo.update({ id: assetId, ...updateData })
  }
}
