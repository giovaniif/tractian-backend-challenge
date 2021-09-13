import { CreateCompany } from '@/domain/features'
import { HttpResponse } from '@/application/helpers'

type HttpRequest = {
  companyName: string
}

type Response = Error | object

export class CreateCompanyController {
  constructor(private readonly service: CreateCompany) {}
  
  async handle(httpRequest: HttpRequest): Promise<HttpResponse<Response>> {
    const result = await this.service.perform({ companyName: httpRequest.companyName })

    if (result instanceof Error) {
      return {
        statusCode: 400,
        data: result,
      }
    }

    return {
      statusCode: 200,
      data: result,
    }
  }
}