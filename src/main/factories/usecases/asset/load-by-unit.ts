import { LoadAssetsByUnit, setupLoadAssetsByUnit } from '@/domain/usecases/asset'
import { makeMongoDBAssetRepo, makeMongoDBUnitRepo } from '@/main/factories/repos'

export const makeLoadAssetsByUnitUseCase = (): LoadAssetsByUnit  => setupLoadAssetsByUnit(makeMongoDBUnitRepo(), makeMongoDBAssetRepo())
