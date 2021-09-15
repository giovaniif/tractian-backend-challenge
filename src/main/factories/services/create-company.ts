import { CreateCompanyService } from '@/data/services'
import { makeMongoDBCompanyRepo } from '@/main/factories/repos'

export const makeCreateCompanyService = (): CreateCompanyService => new CreateCompanyService(makeMongoDBCompanyRepo())
