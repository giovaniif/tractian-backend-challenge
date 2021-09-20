import { LoadAssetsByUnitController } from '@/application/controllers'
import { makeLoadAssetsByUnitUseCase } from '@/main/factories/usecases/asset'

export const makeLoadAssetsByUnitController = () => new LoadAssetsByUnitController(makeLoadAssetsByUnitUseCase())
