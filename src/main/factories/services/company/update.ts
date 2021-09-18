import { UpdateCompanyService } from '@/data/services/company'
import { makeMongoDBCompanyRepo } from '@/main/factories/repos'

export const makeUpdateCompanyService = (): UpdateCompanyService => new UpdateCompanyService(makeMongoDBCompanyRepo())
