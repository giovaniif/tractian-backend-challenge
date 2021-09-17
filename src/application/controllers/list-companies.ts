import { Controller } from '@/application/controllers'
import { HttpResponse, ok } from '@/application/helpers'
import { ListCompanies } from '@/domain/features/list-companies'

type Response = Array<{ id: string, companyName: string }>

export class ListCompaniesController extends Controller {
  constructor(private readonly service: ListCompanies) {
    super()
  }

  async perform(): Promise<any> {
    await this.service.perform()
  }
}