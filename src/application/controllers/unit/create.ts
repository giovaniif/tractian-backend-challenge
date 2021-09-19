import { CreateUnit } from '@/domain/usecases/unit'
import { HttpResponse, ok, badRequest } from '@/application/helpers'
import { Controller } from '@/application/controllers'
import { ValidationBuilder, Validator } from '@/application/validations'

type HttpRequest = { companyId: string, name: string }

type Response = Error | { name: string }

export class CreateUnitController extends Controller {
  constructor(private readonly createUnit: CreateUnit) {
    super()
  }
  
  async perform({ companyId, name }: HttpRequest): Promise<HttpResponse<Response>> {
    const result = await this.createUnit({ companyId, name })

    if (result instanceof Error) return badRequest(result)

    return ok(result)
  }

  override buildValidators ({ companyId, name }: HttpRequest): Validator[] {
    const validators = [
      ...ValidationBuilder.of({
        value: companyId,
        fieldName: 'companyId'
      }).required().build(),
      ...ValidationBuilder.of({
        value: name,
        fieldName: 'name'
      }).required().build(),
    ]
    
    return [...validators]
  }
}
