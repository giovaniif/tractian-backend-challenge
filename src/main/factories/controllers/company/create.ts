import { CreateCompanyController } from '@/application/controllers'
import { makeCreateCompanyUseCase } from '@/main/factories/usecases/company'

export const makeCreateCompanyController = (): CreateCompanyController => new CreateCompanyController(makeCreateCompanyUseCase())
