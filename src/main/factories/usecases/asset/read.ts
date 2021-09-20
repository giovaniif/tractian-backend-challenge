import { ReadAsset, setupReadAsset } from '@/domain/usecases/asset'
import { makeMongoDBAssetRepo } from '@/main/factories/repos'

export const makeReadAssetUseCase = (): ReadAsset => setupReadAsset(makeMongoDBAssetRepo())
