import { ListUnitsFromCompanyController } from '@/application/controllers'
import { makeListUnitsFromCompanyUseCase } from '@/main/factories/usecases/unit'

export const makeListUnitsFromCompanyController = (): ListUnitsFromCompanyController => new ListUnitsFromCompanyController(makeListUnitsFromCompanyUseCase())
