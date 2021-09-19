import { CreateUnitController } from '@/application/controllers'
import { makeCreateUnitUseCase } from '@/main/factories/usecases/unit'

export const makeCreateUnitController = (): CreateUnitController => new CreateUnitController(makeCreateUnitUseCase())
