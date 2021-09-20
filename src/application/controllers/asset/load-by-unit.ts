import { LoadAssetsByUnit } from '@/domain/usecases/asset'
import { badRequest, HttpResponse, ok } from '@/application/helpers'
import { Controller } from '@/application/controllers'
import { ValidationBuilder, Validator } from '@/application/validations'

type HttpRequest = { unitId: string }

type Response = Array<{
  id: string,
  name: string, 
  imageUrl: string, 
  description: string, 
  model: string, 
  owner: string, 
  status: string,
  healthLevel: string,
  unitId: string 
}> | Error

export class LoadAssetsByUnitController extends Controller {
  constructor(private readonly loadAssetsByUnit: LoadAssetsByUnit) {
    super()
  }
  
  async perform({ unitId }: HttpRequest): Promise<HttpResponse<Response>> {
    const result = await this.loadAssetsByUnit({ unitId })
    if (result instanceof Error) return badRequest(result)

    return ok(result)
  }

  override buildValidators (httpRequest: HttpRequest): Validator[] {
    const validators = [
      ...ValidationBuilder.of({ value: httpRequest.unitId, fieldName: 'unitId' }).required().build(),
    ]

    return validators
  }
}