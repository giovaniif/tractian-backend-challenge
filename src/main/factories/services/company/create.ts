import { CreateCompanyService } from '@/domain/services/company'
import { makeMongoDBCompanyRepo } from '@/main/factories/repos'

export const makeCreateCompanyService = (): CreateCompanyService => new CreateCompanyService(makeMongoDBCompanyRepo())
