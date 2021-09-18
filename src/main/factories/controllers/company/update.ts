import { UpdateCompanyController } from '@/application/controllers'
import { makeUpdateCompanyService } from '@/main/factories/services/company'

export const makeUpdatedCompanyController = (): UpdateCompanyController => new UpdateCompanyController(makeUpdateCompanyService())
