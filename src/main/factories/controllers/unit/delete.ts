import { DeleteUnitController } from '@/application/controllers'
import { makeDeleteUnitUseCase } from '@/main/factories/usecases/unit'

export const makeDeleteUnitController = (): DeleteUnitController => new DeleteUnitController(makeDeleteUnitUseCase())
