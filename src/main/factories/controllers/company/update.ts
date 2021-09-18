import { UpdateCompanyController } from '@/application/controllers'
import { makeUpdateCompanyService } from '@/main/factories/services'

export const makeUpdatedCompanyController = (): UpdateCompanyController => new UpdateCompanyController(makeUpdateCompanyService())
