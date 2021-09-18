import { UpdateCompanyService } from '@/data/services'
import { makeMongoDBCompanyRepo } from '@/main/factories/repos'

export const makeUpdateCompanyService = (): UpdateCompanyService => new UpdateCompanyService(makeMongoDBCompanyRepo())
