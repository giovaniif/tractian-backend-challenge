import { ReadCompanyUseCase } from '@/domain/usecases/company'
import { makeMongoDBCompanyRepo } from '@/main/factories/repos'

export const makeReadCompanyUseCase = (): ReadCompanyUseCase => new ReadCompanyUseCase(makeMongoDBCompanyRepo())
