import { CreateCompany } from '@/domain/features'
import { HttpResponse, ok, badRequest } from '@/application/helpers'
import { Company } from '@/domain/models'

type HttpRequest = {
  companyName: string
}

type Response = Error | Company

export class CreateCompanyController {
  constructor(private readonly service: CreateCompany) {}
  
  async handle(httpRequest: HttpRequest): Promise<HttpResponse<Response>> {
    const result = await this.service.perform({ companyName: httpRequest.companyName })

    if (result instanceof Error) {
      return badRequest(result)
    }

    return ok(result)
  }
}