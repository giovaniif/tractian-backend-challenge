import { ReadCompanyController } from '@/application/controllers'
import { makeReadCompanyService } from '@/main/factories/services/company'

export const makeReadCompanyController = (): ReadCompanyController => new ReadCompanyController(makeReadCompanyService())
