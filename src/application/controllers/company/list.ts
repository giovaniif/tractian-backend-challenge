import { Controller } from '@/application/controllers'
import { HttpResponse, ok } from '@/application/helpers'
import { ListCompanies } from '@/domain/usecases/company'

type Response = Array<{ id: string, companyName: string }>

export class ListCompaniesController extends Controller {
  constructor(private readonly listCompanies: ListCompanies) {
    super()
  }

  async perform(): Promise<HttpResponse<Response>> {
    const companies = await this.listCompanies()

    return ok(companies)
  }
}