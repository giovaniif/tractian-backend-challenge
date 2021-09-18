import { ReadCompanyService } from '@/domain/services/company'
import { makeMongoDBCompanyRepo } from '@/main/factories/repos'

export const makeReadCompanyService = (): ReadCompanyService => new ReadCompanyService(makeMongoDBCompanyRepo())
