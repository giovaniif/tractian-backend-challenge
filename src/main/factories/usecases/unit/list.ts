import { setupListUnits, ListUnits } from '@/domain/usecases/unit'
import { makeMongoDBUnitRepo } from '@/main/factories/repos'

export const makeListUnitsUseCase = (): ListUnits => setupListUnits(makeMongoDBUnitRepo())
