import { DeleteCompanyController } from '@/application/controllers'
import { makeDeleteCompanyUseCase } from '@/main/factories/usecases/company'

export const makeDeleteCompanyController = (): DeleteCompanyController => new DeleteCompanyController(makeDeleteCompanyUseCase())
