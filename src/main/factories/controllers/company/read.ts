import { ReadCompanyController } from '@/application/controllers'
import { makeReadCompanyUseCase } from '@/main/factories/usecases/company'

export const makeReadCompanyController = (): ReadCompanyController => new ReadCompanyController(makeReadCompanyUseCase())
