import { ReadCompanyService } from '@/data/services/company'
import { makeMongoDBCompanyRepo } from '@/main/factories/repos'

export const makeReadCompanyService = (): ReadCompanyService => new ReadCompanyService(makeMongoDBCompanyRepo())
