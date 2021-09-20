import { LoadAssetByIdRepository } from '@/domain/contracts/repos'

type Params = { assetId: string }
type Result = undefined | { 
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
  return async ({ assetId }) => assetRepo.loadById({ assetId })
}
