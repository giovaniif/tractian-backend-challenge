import { Controller } from '@/application/controllers'
import { HttpResponse } from '@/application/helpers'
import { ReadCompany } from '@/domain/features/read-company'

type Request = { companyName: string }
type Response = void

export class ReadCompanyController extends Controller {
  constructor(private readonly service: ReadCompany) {
    super()
  }

  async perform({ companyName }: Request): Promise<any> {
    await this.service.perform({ companyName })
  }
}