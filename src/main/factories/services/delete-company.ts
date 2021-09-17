import { DeleteCompanyService } from '@/data/services'
import { makeMongoDBCompanyRepo } from '@/main/factories/repos'

export const makeDeleteCompanyService = (): DeleteCompanyService => new DeleteCompanyService(makeMongoDBCompanyRepo())
