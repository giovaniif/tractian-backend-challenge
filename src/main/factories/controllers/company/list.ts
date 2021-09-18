import { ListCompaniesController } from '@/application/controllers'
import { makeListCompaniesService } from '@/main/factories/services/company'

export const makeListCompaniesController = (): ListCompaniesController => new ListCompaniesController(makeListCompaniesService())
