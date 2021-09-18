import { UpdateCompany, setupUpdateCompany } from '@/domain/usecases/company'
import { makeMongoDBCompanyRepo } from '@/main/factories/repos'

export const makeUpdateCompanyUseCase = (): UpdateCompany => setupUpdateCompany(makeMongoDBCompanyRepo())
