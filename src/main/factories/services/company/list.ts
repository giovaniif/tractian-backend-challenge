import { ListCompaniesService } from '@/data/services/company'
import { makeMongoDBCompanyRepo } from '@/main/factories/repos'

export const makeListCompaniesService = (): ListCompaniesService => new ListCompaniesService(makeMongoDBCompanyRepo())
