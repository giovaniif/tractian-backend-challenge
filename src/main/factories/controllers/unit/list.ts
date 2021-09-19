import { ListUnitsController } from '@/application/controllers'
import { makeListUnitsUseCase } from '@/main/factories/usecases/unit'

export const makeListUnitsController = (): ListUnitsController => new ListUnitsController(makeListUnitsUseCase())
