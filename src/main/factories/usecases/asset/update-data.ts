import { setupUpdateAssetData, UpdateAssetData } from '@/domain/usecases/asset'
import { makeMongoDBAssetRepo } from '@/main/factories/repos'

export const makeUpdateAssetDataUseCase = (): UpdateAssetData => setupUpdateAssetData(makeMongoDBAssetRepo())