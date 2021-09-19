import { DeleteUnit } from '@/domain/usecases/unit'
import { HttpResponse, badRequest, noContent } from '@/application/helpers'
import { Controller } from '@/application/controllers'
import { ValidationBuilder, Validator } from '@/application/validations'

type HttpRequest = { unitId: string }

type Response = Error | { name: string }

export class DeleteUnitController extends Controller {
  constructor(private readonly deleteUnit: DeleteUnit) {
    super()
  }
  
  async perform({ unitId }: HttpRequest): Promise<HttpResponse<Response>> {
    const result = await this.deleteUnit({ unitId })
    if (result instanceof Error) return badRequest(result)
    
    return noContent()
  }

  override buildValidators ({ unitId }: HttpRequest): Validator[] {
    return [...ValidationBuilder.of({ value: unitId, fieldName: 'unitId' }).required().build()]
  }
}
