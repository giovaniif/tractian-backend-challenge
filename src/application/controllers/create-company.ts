import { CreateCompany } from '@/domain/features'
import { HttpResponse, ok, badRequest } from '@/application/helpers'
import { Controller } from '@/application/controllers'

type HttpRequest = {
  companyName: string
}

type Response = Error | { id: string, companyName: string }

export class CreateCompanyController extends Controller {
  constructor(private readonly service: CreateCompany) {
    super()
  }
  
  async perform(httpRequest: HttpRequest): Promise<HttpResponse<Response>> {
    const result = await this.service.perform({ companyName: httpRequest.companyName })

    if (result instanceof Error) {
      return badRequest(result)
    }

    return ok(result)
  }
}