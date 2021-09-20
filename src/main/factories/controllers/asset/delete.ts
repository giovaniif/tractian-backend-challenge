import { DeleteAssetController } from '@/application/controllers'
import { makeDeleteAssetUseCase } from '@/main/factories/usecases/asset'

export const makeDeleteAssetController = (): DeleteAssetController => new DeleteAssetController(makeDeleteAssetUseCase())
