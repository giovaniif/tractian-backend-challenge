import { DeleteCompany, setupDeleteCompany } from '@/domain/usecases/company'
import { makeMongoDBCompanyRepo } from '@/main/factories/repos'

export const makeDeleteCompanyUseCase = (): DeleteCompany => setupDeleteCompany(makeMongoDBCompanyRepo())
