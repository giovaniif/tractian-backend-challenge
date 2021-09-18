import { CreateCompanyController } from '@/application/controllers'
import { makeCreateCompanyService } from '@/main/factories/services/company'

export const makeCreateCompanyController = (): CreateCompanyController => new CreateCompanyController(makeCreateCompanyService())
