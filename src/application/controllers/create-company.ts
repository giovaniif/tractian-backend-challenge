import { CreateCompany } from '@/domain/features'
import { HttpResponse, ok, badRequest } from '@/application/helpers'
import { Controller } from '@/application/controllers'
import { RequiredStringValidator, ValidationComposite } from '@/application/validations'

type HttpRequest = {
  companyName: string
}

type Response = Error | { id: string, companyName: string }

export class CreateCompanyController extends Controller {
  constructor(private readonly service: CreateCompany) {
    super()
  }
  
  async perform(httpRequest: HttpRequest): Promise<HttpResponse<Response>> {
    const error = this.validate(httpRequest)
    if (error) return badRequest(error)
    
    const result = await this.service.perform({ companyName: httpRequest.companyName })

    if (result instanceof Error) {
      return badRequest(result)
    }

    return ok(result)
  }

  private validate ({ companyName }: HttpRequest): Error | undefined {
    const validator = new ValidationComposite([new RequiredStringValidator(companyName, 'companyName')])
    return validator.validate()
  }
}