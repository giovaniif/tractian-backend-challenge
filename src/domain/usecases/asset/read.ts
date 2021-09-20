import { LoadAssetByIdRepository } from '@/domain/contracts/repos'
import { AssetNotFoundError } from '@/domain/errors'

type Params = { assetId: string }
type Result = AssetNotFoundError | { 
  id: string,
  name: string, 
  imageUrl: string, 
  description: string, 
  model: string, 
  owner: string, 
  status: string,
  healthLevel: string,
  unitId: string  
}

export type ReadAsset = (params: Params) => Promise<Result>
type Setup = (assetRepo: LoadAssetByIdRepository) => ReadAsset

export const setupReadAsset: Setup = (assetRepo) => {
  return async ({ assetId }) => {
    const asset = await assetRepo.loadById({ assetId })
    if (!asset) return new AssetNotFoundError()

    return asset
  }
}
