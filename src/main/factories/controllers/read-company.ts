import { ReadCompanyController } from '@/application/controllers'
import { makeReadCompanyService } from '@/main/factories/services'

export const makeReadCompanyController = (): ReadCompanyController => new ReadCompanyController(makeReadCompanyService())
