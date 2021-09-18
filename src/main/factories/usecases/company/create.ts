import { CreateCompanyUseCase } from '@/domain/usecases/company'
import { makeMongoDBCompanyRepo } from '@/main/factories/repos'

export const makeCreateCompanyUseCase = (): CreateCompanyUseCase => new CreateCompanyUseCase(makeMongoDBCompanyRepo())
