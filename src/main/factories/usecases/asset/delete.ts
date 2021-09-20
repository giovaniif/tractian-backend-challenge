import { DeleteAsset, setupDeleteAsset } from '@/domain/usecases/asset'
import { makeMongoDBAssetRepo } from '@/main/factories/repos'

export const makeDeleteAssetUseCase = (): DeleteAsset => setupDeleteAsset(makeMongoDBAssetRepo()) 
