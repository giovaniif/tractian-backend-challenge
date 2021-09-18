import { UpdateCompanyUseCase } from '@/domain/usecases/company'
import { makeMongoDBCompanyRepo } from '@/main/factories/repos'

export const makeUpdateCompanyUseCase = (): UpdateCompanyUseCase => new UpdateCompanyUseCase(makeMongoDBCompanyRepo())
