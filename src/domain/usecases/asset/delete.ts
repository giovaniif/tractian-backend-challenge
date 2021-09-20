import { AssetNotFoundError } from '@/domain/errors'
import { LoadAssetByIdRepository, DeleteAssetRepository } from '@/domain/contracts/repos'

type Params = { assetId: string }
type Result = { name: string } | AssetNotFoundError

export type DeleteAsset = (params: Params) => Promise<Result>
type Setup = (assetRepo: DeleteAssetRepository & LoadAssetByIdRepository) => DeleteAsset

export const setupDeleteAsset: Setup = (assetRepo) => {
  return async ({ assetId }) => {
    const assetExists = await assetRepo.loadById({ assetId })
    if (!assetExists) return new AssetNotFoundError()

    await assetRepo.delete({ assetId })

    return { name: assetExists.name }
  }
}