import { DeleteCompanyController } from '@/application/controllers'
import { makeDeleteCompanyService } from '@/main/factories/services'

export const makeDeleteCompanyController = (): DeleteCompanyController => new DeleteCompanyController(makeDeleteCompanyService())
