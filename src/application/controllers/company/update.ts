import { UpdateCompany } from '@/domain/usecases/company'
import { HttpResponse, ok, badRequest } from '@/application/helpers'
import { Controller } from '@/application/controllers'
import { ValidationBuilder, Validator } from '@/application/validations'

type HttpRequest = {
  companyName: string
  companyId: string
}

type Response = Error | { id: string, companyName: string }

export class UpdateCompanyController extends Controller {
  constructor(private readonly updateCompany: UpdateCompany) {
    super()
  }
  
  async perform({ companyName, companyId }: HttpRequest): Promise<HttpResponse<Response>> {
    const result = await this.updateCompany({ companyName, companyId })

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