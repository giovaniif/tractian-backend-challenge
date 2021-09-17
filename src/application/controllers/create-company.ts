import { CreateCompany } from '@/domain/features'
import { HttpResponse, ok, badRequest } from '@/application/helpers'
import { Controller } from '@/application/controllers'
import { RequiredFieldError } from '@/application/errors'

type HttpRequest = {
  companyName: string
}

type Response = Error | { id: string, companyName: string }

export class CreateCompanyController extends Controller {
  constructor(private readonly service: CreateCompany) {
    super()
  }
  
  async perform({ companyName }: HttpRequest): Promise<HttpResponse<Response>> {
    if (!companyName) return badRequest(new RequiredFieldError('companyName'))
    
    const result = await this.service.perform({ companyName })

    if (result instanceof Error) {
      return badRequest(result)
    }

    return ok(result)
  }
}