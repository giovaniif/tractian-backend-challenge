import { CreateAsset, setupCreateAsset } from '@/domain/usecases/asset'
import { makeMongoDBAssetRepo, makeMongoDBUnitRepo } from '@/main/factories/repos'

export const makeCreateAssetUseCase = (): CreateAsset  => setupCreateAsset(makeMongoDBUnitRepo(), makeMongoDBAssetRepo())