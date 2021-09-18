import { Controller } from '@/application/controllers'
import { HttpResponse, ok } from '@/application/helpers'
import { ListCompaniesUseCase } from '@/domain/usecases/company'

type Response = Array<{ id: string, companyName: string }>

export class ListCompaniesController extends Controller {
  constructor(private readonly usecase: ListCompaniesUseCase) {
    super()
  }

  async perform(): Promise<HttpResponse<Response>> {
    const companies = await this.usecase.perform()

    return ok(companies)
  }
}