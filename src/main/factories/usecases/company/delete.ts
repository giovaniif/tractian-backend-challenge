import { DeleteCompanyUseCase } from '@/domain/usecases/company'
import { makeMongoDBCompanyRepo } from '@/main/factories/repos'

export const makeDeleteCompanyUseCase = (): DeleteCompanyUseCase => new DeleteCompanyUseCase(makeMongoDBCompanyRepo())
