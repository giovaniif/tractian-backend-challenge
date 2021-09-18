import { DeleteCompanyController } from '@/application/controllers'
import { makeDeleteCompanyService } from '@/main/factories/services/company'

export const makeDeleteCompanyController = (): DeleteCompanyController => new DeleteCompanyController(makeDeleteCompanyService())
