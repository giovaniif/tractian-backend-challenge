import { UpdateAssetDataController } from '@/application/controllers'
import { makeUpdateAssetDataUseCase } from '@/main/factories/usecases/asset'

export const makeUpdateAssetDataController = (): UpdateAssetDataController  => new UpdateAssetDataController(makeUpdateAssetDataUseCase())
