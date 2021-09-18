import { ListCompaniesUseCase } from '@/domain/usecases/company'
import { makeMongoDBCompanyRepo } from '@/main/factories/repos'

export const makeListCompaniesUseCase = (): ListCompaniesUseCase => new ListCompaniesUseCase(makeMongoDBCompanyRepo())
