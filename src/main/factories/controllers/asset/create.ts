import { CreateAssetController } from '@/application/controllers'
import { makeCreateAssetUseCase } from '@/main/factories/usecases/asset'

export const makeCreateAssetController = () => new CreateAssetController(makeCreateAssetUseCase())
