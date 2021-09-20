import { ReadAssetController } from '@/application/controllers'
import { makeReadAssetUseCase } from '@/main/factories/usecases/asset'

export const makeReadAssetController = (): ReadAssetController => new ReadAssetController(makeReadAssetUseCase())
