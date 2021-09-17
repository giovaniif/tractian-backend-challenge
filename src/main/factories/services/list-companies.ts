import { ListCompaniesService } from '@/data/services'
import { makeMongoDBCompanyRepo } from '@/main/factories/repos'

export const makeListCompaniesService = (): ListCompaniesService => new ListCompaniesService(makeMongoDBCompanyRepo())
