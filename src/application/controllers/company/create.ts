import { CreateCompany } from '@/domain/usecases/company'
import { HttpResponse, ok, badRequest } from '@/application/helpers'
import { Controller } from '@/application/controllers'
import { ValidationBuilder, Validator } from '@/application/validations'

type HttpRequest = {
  companyName: string
}

type Response = Error | { id: string, companyName: string }

export class CreateCompanyController extends Controller {
  constructor(private readonly createCompany: CreateCompany) {
    super()
  }
  
  async perform(httpRequest: HttpRequest): Promise<HttpResponse<Response>> {
    const result = await this.createCompany({ companyName: httpRequest.companyName })

    if (result instanceof Error) {
      return badRequest(result)
    }

    return ok(result)
  }

  override buildValidators ({ companyName }: HttpRequest): Validator[] {
    const validators = ValidationBuilder.of({
      value: companyName,
      fieldName: 'companyName'
    }).required().build()
    
    return [...validators]
  }
}