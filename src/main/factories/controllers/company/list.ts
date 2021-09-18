import { ListCompaniesController } from '@/application/controllers'
import { makeListCompaniesUseCase } from '@/main/factories/usecases/company'

export const makeListCompaniesController = (): ListCompaniesController => new ListCompaniesController(makeListCompaniesUseCase())
