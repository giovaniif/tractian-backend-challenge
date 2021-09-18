import { Controller } from '@/application/controllers'
import { HttpResponse, ok } from '@/application/helpers'
import { ListCompanies } from '@/domain/features/company'

type Response = Array<{ id: string, companyName: string }>

export class ListCompaniesController extends Controller {
  constructor(private readonly service: ListCompanies) {
    super()
  }

  async perform(): Promise<HttpResponse<Response>> {
    const companies = await this.service.perform()

    return ok(companies)
  }
}