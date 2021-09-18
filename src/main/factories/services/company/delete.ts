import { DeleteCompanyService } from '@/domain/services/company'
import { makeMongoDBCompanyRepo } from '@/main/factories/repos'

export const makeDeleteCompanyService = (): DeleteCompanyService => new DeleteCompanyService(makeMongoDBCompanyRepo())
