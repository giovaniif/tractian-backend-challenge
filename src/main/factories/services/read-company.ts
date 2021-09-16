import { ReadCompanyService } from '@/data/services'
import { makeMongoDBCompanyRepo } from '@/main/factories/repos'

export const makeReadCompanyService = (): ReadCompanyService => new ReadCompanyService(makeMongoDBCompanyRepo())
