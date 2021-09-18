import { UpdateCompanyController } from '@/application/controllers'
import { makeUpdateCompanyUseCase } from '@/main/factories/usecases/company'

export const makeUpdatedCompanyController = (): UpdateCompanyController => new UpdateCompanyController(makeUpdateCompanyUseCase())
