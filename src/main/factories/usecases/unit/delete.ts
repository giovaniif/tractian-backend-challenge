import { DeleteUnit, setupDeleteUnit } from '@/domain/usecases/unit'
import { makeMongoDBUnitRepo } from '@/main/factories/repos'

export const makeDeleteUnitUseCase = (): DeleteUnit => setupDeleteUnit(makeMongoDBUnitRepo()) 
