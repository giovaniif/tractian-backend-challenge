import { setupListUnitsFromCompany, ListUnitsFromCompany } from '@/domain/usecases/unit'
import { makeMongoDBUnitRepo } from '@/main/factories/repos'

export const makeListUnitsFromCompanyUseCase = (): ListUnitsFromCompany => setupListUnitsFromCompany(makeMongoDBUnitRepo())
