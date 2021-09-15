import { CreateCompanyController } from '@/application/controllers'
import { makeCreateCompanyService } from '@/main/factories/services'

export const makeCreateCompanyController = (): CreateCompanyController => new CreateCompanyController(makeCreateCompanyService())
