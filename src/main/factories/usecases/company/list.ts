import { ListCompanies, setupListCompanies } from '@/domain/usecases/company'
import { makeMongoDBCompanyRepo } from '@/main/factories/repos'

export const makeListCompaniesUseCase = (): ListCompanies => setupListCompanies(makeMongoDBCompanyRepo())
